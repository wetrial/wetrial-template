import React, { memo } from 'react';
import { useDrag, DndProvider, DragSourceMonitor, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default () => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
};

const Container = memo(() => {
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Dustbin />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Box name="Glass" />
        <Box name="Banana" />
        <Box name="Paper" />
      </div>
    </div>
  );
});

const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'box',
    drop: () => ({
      name: 'Dustbin',
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  const style: React.CSSProperties = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
  };
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  );
};

const Box = ({ name }) => {
  const [collectedProps, drag] = useDrag<any, any, any>({
    item: { id: name, type: 'box' },
    end: (item: { id: string } | undefined, monitor: DragSourceMonitor) => {
      console.log(item);
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(`You dropped ${item.id} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const style: React.CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    width: '200px',
  };
  const opacity = collectedProps.isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {name}
    </div>
  );
};
