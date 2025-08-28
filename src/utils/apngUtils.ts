import UPNG from 'upng-js';
import { FrameData, AnimationConfig } from '../types';

// CRC32计算函数
function crc32(data: Uint8Array): number {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// 修改APNG的循环次数
function setAPNGLoopCount(buffer: ArrayBuffer, loops: number): ArrayBuffer {
  const view = new Uint8Array(buffer);
  const result = new Uint8Array(buffer.byteLength);
  result.set(view);
  
  // 查找acTL chunk
  let offset = 8; // 跳过PNG签名
  
  while (offset < result.length - 8) {
    const chunkLength = new DataView(result.buffer, offset).getUint32(0);
    const chunkType = new TextDecoder().decode(result.slice(offset + 4, offset + 8));
    
    if (chunkType === 'acTL') {
      // 找到acTL chunk，修改num_plays字段
      // acTL chunk结构：length(4) + type(4) + num_frames(4) + num_plays(4) + crc(4)
      const dataView = new DataView(result.buffer, offset + 8); // 跳过length和type
      dataView.setUint32(4, loops); // 设置num_plays字段（offset + 12）
      
      // 重新计算CRC
      const chunkData = result.slice(offset + 4, offset + 8 + chunkLength);
      const newCrc = crc32(chunkData);
      new DataView(result.buffer, offset + 8 + chunkLength).setUint32(0, newCrc);
      
      break;
    }
    
    offset += 8 + chunkLength + 4; // 移动到下一个chunk
  }
  
  return result.buffer;
}

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

// 压缩ImageData - 通过减少颜色深度来实现文件体积压缩
function compressImageData(imageData: ImageData, quality: number): ImageData {
  // 如果质量设置为100%，不进行压缩
  if (quality >= 100) return imageData;
  
  const data = new Uint8ClampedArray(imageData.data);
  
  // 根据质量参数计算颜色量化级别
  // quality: 0-100, 转换为量化级别 2-256
  const quantizationLevel = Math.max(2, Math.floor((quality / 100) * 254) + 2);
  const step = 256 / quantizationLevel;
  
  // 对每个像素进行颜色量化
  for (let i = 0; i < data.length; i += 4) {
    // 量化RGB通道，保持Alpha通道不变
    data[i] = Math.floor(data[i] / step) * step;     // Red
    data[i + 1] = Math.floor(data[i + 1] / step) * step; // Green
    data[i + 2] = Math.floor(data[i + 2] / step) * step; // Blue
    // Alpha通道保持不变: data[i + 3]
  }
  
  return new ImageData(data, imageData.width, imageData.height);
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
    
    // 修改APNG的循环次数
    const modifiedBuffer = setAPNGLoopCount(apngBuffer, config.loops);
    
    return new Blob([modifiedBuffer], { type: 'image/apng' });
  } catch (error) {
    console.error('APNG生成失败:', error);
    throw new Error(`APNG生成失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

// 预览APNG动画
export function previewAPNG(blob: Blob): string {
  return URL.createObjectURL(blob);
}