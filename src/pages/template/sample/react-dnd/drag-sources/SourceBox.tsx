import React, { useState, useCallback, useRef } from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor, XYCoord } from 'react-dnd';
import { Colors } from './Colors';

const style: React.CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem',
};

export interface StatefulSourceBoxProps {
  color: string;
  children?: any;
  index: number;
  moveBox: (dragIndex: number, hoverIndex: number) => void;
}

export default ({ color, children, index, moveBox }: StatefulSourceBoxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [forbidDrag, setForbidDrag] = useState(false);
  const handleToggleForbidDrag = useCallback(() => {
    setForbidDrag(!forbidDrag);
  }, [forbidDrag]);

  const [{ isDragging }, drag] = useDrag<any, any, any>({
    item: {
      type: color,
      index,
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => {
      return !forbidDrag;
    },
  });

  const [, drop] = useDrop({
    accept: [Colors.BLUE, Colors.YELLOW],
    hover(item: { type: string; index: number }, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // 拖拽元素下标与鼠标悬浮元素下标一致时，不进行操作
      if (dragIndex === hoverIndex) {
        return;
      }

      // 确定屏幕上矩形范围
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      // 获取中点垂直坐标
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // 确定鼠标位置
      const clientOffset = monitor.getClientOffset();

      // 获取距顶部距离
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      /**
       * 只在鼠标越过一半物品高度时执行移动。
       *
       * 当向下拖动时，仅当光标低于50%时才移动。
       * 当向上拖动时，仅当光标在50%以上时才移动。
       *
       * 可以防止鼠标位于元素一半高度时元素抖动的状况
       */

      // 向下拖动
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // 向上拖动
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // 执行 move 回调函数
      moveBox(dragIndex, hoverIndex);

      /**
       * 如果拖拽的组件为 Box，则 dragIndex 为 undefined，此时不对 item 的 index 进行修改
       * 如果拖拽的组件为 Card，则将 hoverIndex 赋值给 item 的 index 属性
       */
      if (item.index !== undefined) {
        // eslint-disable-next-line no-param-reassign
        item.index = hoverIndex;
      }
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  let backgroundColor;
  switch (color) {
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow';
      break;
    case Colors.BLUE:
      backgroundColor = 'lightblue';
      break;
    default:
      break;
  }

  drop(drag(ref));

  return (
    <div
      ref={ref}
      style={{
        ...style,
        backgroundColor,
        opacity,
        cursor: forbidDrag ? 'default' : 'move',
      }}
    >
      <input type="checkbox" checked={forbidDrag} onChange={handleToggleForbidDrag} />
      <small>Forbid drag</small>
      {children}
    </div>
  );
};
