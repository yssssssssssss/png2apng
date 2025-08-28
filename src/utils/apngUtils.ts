import UPNG from 'upng-js';
import { FrameData, AnimationConfig } from '../types';

// 将图片文件转换为ImageData
function fileToImageData(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('无法创建canvas context'));
      return;
    }
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        resolve(imageData);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = URL.createObjectURL(file);
  });
}

// 压缩ImageData
function compressImageData(imageData: ImageData, quality: number): ImageData {
  // 简单的质量压缩实现
  if (quality >= 100) return imageData;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return imageData;
  
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  ctx.putImageData(imageData, 0, 0);
  
  // 使用canvas的压缩功能
  const compressedCanvas = document.createElement('canvas');
  const compressedCtx = compressedCanvas.getContext('2d');
  
  if (!compressedCtx) return imageData;
  
  const scale = quality / 100;
  compressedCanvas.width = Math.floor(imageData.width * scale);
  compressedCanvas.height = Math.floor(imageData.height * scale);
  
  compressedCtx.drawImage(canvas, 0, 0, compressedCanvas.width, compressedCanvas.height);
  
  // 重新调整到原始尺寸
  const finalCanvas = document.createElement('canvas');
  const finalCtx = finalCanvas.getContext('2d');
  
  if (!finalCtx) return imageData;
  
  finalCanvas.width = imageData.width;
  finalCanvas.height = imageData.height;
  finalCtx.drawImage(compressedCanvas, 0, 0, imageData.width, imageData.height);
  
  return finalCtx.getImageData(0, 0, imageData.width, imageData.height);
}

// 生成APNG
export async function generateAPNG(
  frames: FrameData[], 
  config: AnimationConfig
): Promise<Blob> {
  if (frames.length === 0) {
    throw new Error('没有可用的帧');
  }
  
  try {
    // 转换所有帧为ImageData
    const imageDataArray = await Promise.all(
      frames.map(frame => fileToImageData(frame.file))
    );
    
    // 压缩处理
    const processedFrames = imageDataArray.map(imageData => 
      compressImageData(imageData, config.quality)
    );
    
    // 获取第一帧的尺寸
    const { width, height } = processedFrames[0];
    
    // 转换为UPNG需要的格式
    const buffers = processedFrames.map(imageData => {
      const buffer = new ArrayBuffer(imageData.data.length);
      const view = new Uint8Array(buffer);
      view.set(imageData.data);
      return buffer;
    });
    
    // 计算延迟时间（毫秒）
    const delay = Math.round(1000 / config.fps);
    const delays = new Array(frames.length).fill(delay);
    
    // 生成APNG
    const apngBuffer = UPNG.encode(
      buffers,
      width,
      height,
      0, // cnum (color count, 0 for auto)
      delays
    );
    
    return new Blob([apngBuffer], { type: 'image/apng' });
  } catch (error) {
    console.error('APNG生成失败:', error);
    throw new Error(`APNG生成失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

// 预览APNG动画
export function previewAPNG(blob: Blob): string {
  return URL.createObjectURL(blob);
}