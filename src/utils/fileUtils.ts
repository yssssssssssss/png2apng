import { FrameData } from '../types';

// 生成唯一ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// 生成图片预览
export function generatePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('File reading error'));
    reader.readAsDataURL(file);
  });
}

// 验证文件类型
export function isValidPngFile(file: File): boolean {
  return file.type === 'image/png';
}

// 处理文件上传
export async function processFiles(files: FileList): Promise<FrameData[]> {
  const validFiles = Array.from(files).filter(isValidPngFile);
  const framePromises = validFiles.map(async (file, index) => {
    const preview = await generatePreview(file);
    return {
      id: generateId(),
      file,
      name: file.name,
      preview,
      order: index
    };
  });
  
  return Promise.all(framePromises);
}

// 下载文件
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 格式化文件大小
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}