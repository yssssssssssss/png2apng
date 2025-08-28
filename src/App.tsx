import React from 'react';
import { AppProvider } from './context/AppContext';
import { FileUpload } from './components/FileUpload';
import { FrameManager } from './components/FrameManager';
import { AnimationSettings } from './components/AnimationSettings';
import { PreviewDownload } from './components/PreviewDownload';
import { Zap } from 'lucide-react';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
        {/* 头部 */}
        <header className="bg-black shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-100">
                  PNG转APNG
                </h1>
                <p className="text-sm text-white">
                  
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* 主要内容 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧列 */}
            <div className="space-y-8">
              {/* 文件上传 */}
              <FileUpload />
              
              {/* 帧管理 */}
              <FrameManager />
            </div>

            {/* 右侧列 */}
            <div className="space-y-8">
              {/* 动画参数设置 */}
              <AnimationSettings />
              
              {/* 预览与下载 */}
              <PreviewDownload />
            </div>
          </div>
        </main>

        {/* 页脚 */}
        {/* <footer className="bg-gray-50 border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-sm text-gray-500">              
            </div>
          </div>
        </footer> */}
      </div>
    </AppProvider>
  );
}

export default App;
