import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Tree from './Tree';
import { ItemTypes } from './ItemTypes';

export interface IDragItem {
  id: number;
  parent?: number;
  title?: string;
  children: IDragItem[];
}

export interface IItemProps {
  id: number;
  parent?: number;
  item: IDragItem;
  move: Function;
  find: Function;
  chidren?: any;
}

export default (props: IItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag<any, any, any>({
    item: {
      type: ItemTypes.ITEM,
      id: props.id,
      parent: props.parent,
      items: props.item.children,
    },
    isDragging(monitor) {
      return props.id === monitor.getItem().id;
    },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    canDrop() {
      return false;
    },
    hover: (item, monitor) => {
      const { id: draggedId } = monitor.getItem();
      const { id: overId } = props.item;
      if (draggedId === overId || draggedId === props.parent) return;
      if (!monitor.isOver({ shallow: true })) return;

      props.move(draggedId, overId, props.parent);
    },
  });

  drop(drag(ref));

  const {
    item: { title, children },
    move,
    find,
  } = props;

  return (
    <div ref={ref}>
      <div
        style={{
          background: 'white',
          border: '1px solid #ccc',
          padding: '1em',
          marginBottom: -1,
        }}
      >
        {title}
      </div>
      <Tree parent={props.id} items={children} move={move} find={find} />
    </div>
  );
};
