import React, { useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { processFiles } from '../utils/fileUtils';
import { Upload, X, FileImage } from 'lucide-react';

interface FileUploadProps {
  className?: string;
}

export function FileUpload({ className = '' }: FileUploadProps) {
  const { state, dispatch } = useAppContext();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理文件选择
  const handleFileSelect = async (files: FileList) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    try {
      const newFrames = await processFiles(files);
      dispatch({ type: 'ADD_FRAMES', payload: newFrames });
    } catch (error) {
      console.error('文件处理失败:', error);
      alert('文件处理失败，请确保选择的是PNG格式的图片文件');
    } finally {
      setIsUploading(false);
    }
  };

  // 拖拽事件处理
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  // 点击上传
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // 清空所有帧
  const handleClearAll = () => {
    if (state.frames.length > 0 && confirm('确定要清空所有帧吗？')) {
      dispatch({ type: 'CLEAR_ALL_FRAMES' });
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">上传PNG序列帧</h2>
        </div>
        {state.frames.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
          >
            <X className="w-4 h-4" />
            清空所有
          </button>
        )}
      </div>

      {/* 上传区域 */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png"
          onChange={(e) => {
            if (e.target.files) {
              handleFileSelect(e.target.files);
              // 清空input的value，允许重复选择相同文件
              e.target.value = '';
            }
          }}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center
            ${isDragOver ? 'bg-blue-100' : 'bg-gray-100'}
          `}>
            <FileImage className={`
              w-8 h-8 
              ${isDragOver ? 'text-blue-600' : 'text-gray-400'}
            `} />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isUploading ? '正在处理文件...' : '拖拽PNG文件到此处或点击选择'}
            </p>
            <p className="text-sm text-gray-500">
              支持多选，仅支持PNG格式图片
            </p>
          </div>
        </div>
      </div>

      {/* 帧数量显示 */}
      {state.frames.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              已上传 {state.frames.length} 帧
            </span>
            <span className="text-xs text-blue-600">
              总大小: {(state.frames.reduce((sum, frame) => sum + frame.file.size, 0) / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        </div>
      )}
    </div>
  );
}