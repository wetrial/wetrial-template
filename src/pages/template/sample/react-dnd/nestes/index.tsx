import React, { useState, useCallback } from 'react';
import { useDrag, DndProvider, DragSourceMonitor, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Tree from './Tree';
import { IDragItem } from './Item';

const tree: IDragItem[] = [
  {
    id: 1,
    title: 'Tatooine',
    children: [
      { id: 2, title: 'Endor', children: [] },
      { id: 3, title: 'Hoth', children: [] },
      { id: 4, title: 'Dagobah', children: [] },
    ],
  },
  {
    id: 5,
    title: 'Death Star',
    children: [],
  },
  {
    id: 6,
    title: 'Alderaan',
    children: [
      {
        id: 7,
        title: 'Bespin',
        children: [{ id: 8, title: 'Jakku', children: [] }],
      },
    ],
  },
];

const findItemHelper = (id, items: IDragItem[]): IDragItem | false => {
  let result: IDragItem | false = false;
  items.forEach((element) => {
    if (element.id === id) {
      result = element;
      return;
    }
    if (element.children && element.children.length) {
      result = findItemHelper(id, element.children);
      if (result) {
        return;
      }
    }
  });
  return result;
};

export default () => {
  const [list, setList] = useState(tree);

  const findItem = useCallback(
    (id) => {
      return findItemHelper(id, list);
    },
    [list],
  );

  const moveItem = (id, afterId, nodeId) => {
    if (id === afterId) return;
    const listData = [...list];

    const removeNode = (tId, items) => {
      items.forEach((node) => {
        if (node.id === tId) {
          items.splice(items.indexOf(node), 1);
          return;
        }

        if (node.children && node.children.length) {
          removeNode(tId, node.children);
        }
      });
    };

    const item = { ...findItemHelper(id, listData) };
    if (!item['id']) {
      return;
    }

    const dest = nodeId ? findItemHelper(nodeId, list)['children'] : listData;

    if (!afterId) {
      removeNode(id, tree);
      dest.push(item);
    } else {
      const index = dest.indexOf(dest.filter((v) => v.id === afterId).shift());
      removeNode(id, tree);
      dest.splice(index, 0, item);
    }
    setList(listData);
  };

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Tree items={list} move={moveItem} find={findItem} />
      </DndProvider>
    </div>
  );
};
