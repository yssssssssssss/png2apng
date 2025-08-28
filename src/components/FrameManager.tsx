import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAppContext } from '../context/AppContext';
import { FrameData } from '../types';
import { Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import { formatFileSize } from '../utils/fileUtils';

interface FrameManagerProps {
  className?: string;
}

export function FrameManager({ className = '' }: FrameManagerProps) {
  const { state, dispatch } = useAppContext();

  // 处理拖拽结束
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(state.frames);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // 更新order属性
    const reorderedFrames = items.map((frame, index) => ({
      ...frame,
      order: index
    }));

    dispatch({ type: 'REORDER_FRAMES', payload: reorderedFrames });
  };

  // 删除帧
  const handleRemoveFrame = (frameId: string) => {
    dispatch({ type: 'REMOVE_FRAME', payload: frameId });
  };

  if (state.frames.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="w-5 h-5 text-orange-600" />
          <h2 className="text-lg font-semibold text-gray-800">帧管理</h2>
        </div>
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无帧数据</p>
          <p className="text-sm text-gray-400 mt-1">请先上传PNG图片文件</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-orange-600" />
          <h2 className="text-lg font-semibold text-gray-800">帧管理</h2>
        </div>
        <span className="text-sm text-gray-500">
          共 {state.frames.length} 帧
        </span>
      </div>

      {/* 拖拽容器 */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="frames" direction="vertical">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`
                space-y-2 min-h-[100px] p-2 rounded-lg transition-colors
                ${snapshot.isDraggingOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''}
              `}
            >
              {state.frames.map((frame, index) => (
                <Draggable key={frame.id} draggableId={frame.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`
                        flex items-center gap-3 p-3 bg-gray-50 rounded-lg border transition-all
                        ${snapshot.isDragging 
                          ? 'shadow-lg border-blue-300 bg-white' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      {/* 拖拽手柄 */}
                      <div
                        {...provided.dragHandleProps}
                        className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="w-4 h-4" />
                      </div>

                      {/* 序号 */}
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>

                      {/* 缩略图 */}
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border">
                        <img
                          src={frame.preview}
                          alt={frame.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* 文件信息 */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {frame.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatFileSize(frame.file.size)}
                        </p>
                      </div>

                      {/* 删除按钮 */}
                      <button
                        onClick={() => handleRemoveFrame(frame.id)}
                        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="删除此帧"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* 提示信息 */}
      <div className="mt-4 p-3 bg-orange-50 rounded-lg">
        <p className="text-sm text-orange-800">
          💡 拖拽帧可以调整播放顺序，点击垃圾桶图标可以删除帧
        </p>
      </div>
    </div>
  );
}