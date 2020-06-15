import React from 'react';
import { useDrop } from 'react-dnd';
import Item, { IDragItem } from './Item';
import { ItemTypes } from '../drop-targets/ItemTypes';

export interface ITreeProps {
  items: IDragItem[];
  parent?: number;
  move: Function;
  find: Function;
}

export default (props: ITreeProps) => {
  const [, drop] = useDrop<any, any, any>({
    accept: ItemTypes.BOX,
    hover(prop, monitor) {
      const { id: draggedId, parent, items } = monitor.getItem();

      if (!monitor.isOver({ shallow: true })) return;

      const descendantNode = props.find(props.parent, items);
      if (descendantNode) return;
      if (parent === props.parent || draggedId === props.parent) return;

      props.move(draggedId, prop.id, props.parent);
    },
  });
  const { items, parent, find, move } = props;
  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        minHeight: 10,
        paddingTop: 10,
        marginTop: -11,
        marginLeft: '2em',
      }}
    >
      {items.map((item) => (
        <Item key={item.id} id={item.id} parent={parent} item={item} move={move} find={find} />
      ))}
    </div>
  );
};
