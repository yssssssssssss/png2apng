// 帧数据结构
export interface FrameData {
  id: string;
  file: File;
  name: string;
  preview: string; // base64 data URL
  order: number;
}

// 动画配置结构
export interface AnimationConfig {
  fps: number; // 帧率 1-60
  loops: number; // 循环次数，0表示无限循环
  quality: number; // 压缩质量 0-100
}

// 应用状态结构
export interface AppState {
  frames: FrameData[];
  config: AnimationConfig;
  isGenerating: boolean;
  generatedApng: Blob | null;
}

// Action类型定义
export type AppAction = 
  | { type: 'ADD_FRAMES'; payload: FrameData[] }
  | { type: 'REMOVE_FRAME'; payload: string }
  | { type: 'REORDER_FRAMES'; payload: FrameData[] }
  | { type: 'UPDATE_CONFIG'; payload: Partial<AnimationConfig> }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'SET_GENERATED_APNG'; payload: Blob | null }
  | { type: 'CLEAR_ALL_FRAMES' };

// 拖拽结果类型
export interface DragResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination?: {
    droppableId: string;
    index: number;
  } | null;
}