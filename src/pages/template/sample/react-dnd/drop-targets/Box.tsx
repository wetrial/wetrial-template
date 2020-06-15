import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const style: React.CSSProperties = {
  display: 'inline-block',
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move',
  marginLeft: 20,
};

export default () => {
  const [, drag] = useDrag({
    item: {
      type: ItemTypes.BOX,
    },
  });
  return (
    <div ref={drag} style={style}>
      Drag me
    </div>
  );
};
