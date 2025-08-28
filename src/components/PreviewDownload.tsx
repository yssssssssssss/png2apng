import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { generateAPNG, previewAPNG } from '../utils/apngUtils';
import { downloadBlob, formatFileSize } from '../utils/fileUtils';
import { Play, Download, Loader2, Eye, AlertCircle } from 'lucide-react';

interface PreviewDownloadProps {
  className?: string;
}

export function PreviewDownload({ className = '' }: PreviewDownloadProps) {
  const { state, dispatch } = useAppContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 生成APNG
  const handleGenerate = async () => {
    if (state.frames.length === 0) {
      setError('请先上传PNG图片文件');
      return;
    }

    setError(null);
    dispatch({ type: 'SET_GENERATING', payload: true });

    try {
      const apngBlob = await generateAPNG(state.frames, state.config);
      dispatch({ type: 'SET_GENERATED_APNG', payload: apngBlob });
      
      // 生成预览URL
      const url = previewAPNG(apngBlob);
      setPreviewUrl(url);
    } catch (error) {
      console.error('生成APNG失败:', error);
      setError(error instanceof Error ? error.message : '生成失败，请重试');
    } finally {
      dispatch({ type: 'SET_GENERATING', payload: false });
    }
  };

  // 下载APNG
  const handleDownload = () => {
    if (!state.generatedApng) return;
    
    const filename = `animation_${Date.now()}.apng`;
    downloadBlob(state.generatedApng, filename);
  };

  // 清理预览URL
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // 监听frames变化，清空时重置预览状态
  React.useEffect(() => {
    if (state.frames.length === 0) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setError(null);
    }
  }, [state.frames.length, previewUrl]);

  const canGenerate = state.frames.length > 0 && !state.isGenerating;
  const hasGenerated = state.generatedApng !== null;

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* 标题栏 */}
      <div className="flex items-center gap-2 mb-6">
        <Eye className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-800">预览与下载</h2>
      </div>

      {/* 操作按钮 */}
      <div className="space-y-4">
        {/* 生成按钮 */}
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className={`
            w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all
            ${canGenerate
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {state.isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              正在生成APNG...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              生成APNG动画
            </>
          )}
        </button>

        {/* 下载按钮 */}
        {hasGenerated && (
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5" />
            下载APNG文件
          </button>
        )}
      </div>

      {/* 错误信息 */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* 预览区域 */}
      {previewUrl && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">动画预览</h3>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt="APNG预览"
                className="max-w-full max-h-64 rounded border bg-white shadow-sm"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 文件信息 */}
      {hasGenerated && state.generatedApng && (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <h3 className="text-sm font-medium text-purple-800 mb-2">文件信息</h3>
          <div className="space-y-1 text-xs text-purple-700">
            <div className="flex justify-between">
              <span>文件大小:</span>
              <span>{formatFileSize(state.generatedApng.size)}</span>
            </div>
            <div className="flex justify-between">
              <span>帧数:</span>
              <span>{state.frames.length} 帧</span>
            </div>
            <div className="flex justify-between">
              <span>帧率:</span>
              <span>{state.config.fps} FPS</span>
            </div>
            <div className="flex justify-between">
              <span>动画时长:</span>
              <span>{(state.frames.length / state.config.fps).toFixed(1)} 秒</span>
            </div>
            <div className="flex justify-between">
              <span>循环次数:</span>
              <span>{state.config.loops === 0 ? '无限' : `${state.config.loops}次`}</span>
            </div>
          </div>
        </div>
      )}

      {/* 提示信息 */}
      {!hasGenerated && state.frames.length === 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            请先上传PNG图片文件，然后点击生成按钮创建APNG动画
          </p>
        </div>
      )}

      {!hasGenerated && state.frames.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            已准备 {state.frames.length} 帧图片，点击生成按钮创建APNG动画
          </p>
        </div>
      )}
    </div>
  );
}