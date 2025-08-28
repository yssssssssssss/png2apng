import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Settings, Zap, RotateCcw, Gauge } from 'lucide-react';

interface AnimationSettingsProps {
  className?: string;
}

export function AnimationSettings({ className = '' }: AnimationSettingsProps) {
  const { state, dispatch } = useAppContext();
  const { config } = state;

  // 更新配置
  const updateConfig = (updates: Partial<typeof config>) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: updates });
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* 标题栏 */}
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-800">动画参数设置</h2>
      </div>

      <div className="space-y-6">
        {/* 帧率设置 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-blue-600" />
            <label className="text-sm font-medium text-gray-700">
              帧率 (FPS)
            </label>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="60"
                value={config.fps}
                onChange={(e) => updateConfig({ fps: parseInt(e.target.value) })}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={config.fps}
                  onChange={(e) => updateConfig({ fps: parseInt(e.target.value) || 1 })}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500">FPS</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              帧率越高动画越流畅，但文件会更大。推荐值：10-30 FPS
            </p>
          </div>
        </div>

        {/* 循环次数设置 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw className="w-4 h-4 text-green-600" />
            <label className="text-sm font-medium text-gray-700">
              循环次数
            </label>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <select
                value={config.loops}
                onChange={(e) => updateConfig({ loops: parseInt(e.target.value) })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value={0}>无限循环</option>
                <option value={1}>播放1次</option>
              </select>
            </div>
            <p className="text-xs text-gray-500">
              设置动画的重复播放次数，0表示无限循环
            </p>
          </div>
        </div>

        {/* 压缩质量设置 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-orange-600" />
            <label className="text-sm font-medium text-gray-700">
              压缩质量
            </label>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="100"
                value={config.quality}
                onChange={(e) => updateConfig({ quality: parseInt(e.target.value) })}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex items-center gap-2">
                <span className="w-12 text-sm font-medium text-gray-700">
                  {config.quality}%
                </span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>文件更小</span>
              <span>质量更高</span>
            </div>
            <p className="text-xs text-gray-500">
              质量越高图片越清晰，但文件会更大。推荐值：70-90%
            </p>
          </div>
        </div>

        {/* 预估信息 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">预估信息</h3>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>动画时长:</span>
              <span>
                {state.frames.length > 0 
                  ? `${(state.frames.length / config.fps).toFixed(1)}秒`
                  : '0秒'
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>每帧间隔:</span>
              <span>{Math.round(1000 / config.fps)}毫秒</span>
            </div>
            <div className="flex justify-between">
              <span>循环设置:</span>
              <span>{config.loops === 0 ? '无限循环' : `${config.loops}次`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}