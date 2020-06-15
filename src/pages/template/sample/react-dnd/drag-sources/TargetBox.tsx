import React, { useState, useCallback } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { Colors } from './Colors';

const style: React.CSSProperties = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center',
};

export interface StatefulTargetBoxState {
  lastDroppedColor: string | null;
}

export default () => {
  const [lastDroppedColor, setlastDroppedColor] = useState<string | null>(null);
  const handleDrop = useCallback((color: string) => setlastDroppedColor(color), []);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [Colors.YELLOW, Colors.BLUE],
    drop(item, monitor: DropTargetMonitor) {
      const color = monitor.getItemType() as string;
      handleDrop(color);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggingColor: monitor.getItemType() as string,
    }),
  });

  const opacity = isOver ? 1 : 0.7;
  let backgroundColor = '#fff';
  switch (lastDroppedColor) {
    case Colors.BLUE:
      backgroundColor = 'lightblue';
      break;
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow';
      break;
    default:
      break;
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor, opacity }}>
      <p>Drop here.</p>
      {!canDrop && lastDroppedColor && <p>Last dropped: {lastDroppedColor}</p>}
    </div>
  );
};
