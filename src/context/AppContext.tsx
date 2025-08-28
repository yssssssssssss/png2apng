import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, AnimationConfig } from '../types';

// 初始状态
const initialState: AppState = {
  frames: [],
  config: {
    fps: 15,
    loops: 0, // 无限循环
    quality: 80
  },
  isGenerating: false,
  generatedApng: null
};

// Reducer函数
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_FRAMES':
      return {
        ...state,
        frames: [...state.frames, ...action.payload]
      };
    
    case 'REMOVE_FRAME':
      return {
        ...state,
        frames: state.frames.filter(frame => frame.id !== action.payload)
      };
    
    case 'REORDER_FRAMES':
      return {
        ...state,
        frames: action.payload
      };
    
    case 'UPDATE_CONFIG':
      return {
        ...state,
        config: { ...state.config, ...action.payload }
      };
    
    case 'SET_GENERATING':
      return {
        ...state,
        isGenerating: action.payload
      };
    
    case 'SET_GENERATED_APNG':
      return {
        ...state,
        generatedApng: action.payload
      };
    
    case 'CLEAR_ALL_FRAMES':
      return {
        ...state,
        frames: [],
        generatedApng: null
      };
    
    default:
      return state;
  }
}

// Context类型
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

// 创建Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider组件
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook for using context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}