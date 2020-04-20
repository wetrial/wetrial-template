import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './index.less';

// 初始化数据
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + 1}`,
    type: `list-${k}`,
    content: `this is content ${k + 1}`,
  }));

// 重新记录数组顺序
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

// 设置样式
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // 拖拽的时候背景变化
  background: isDragging ? 'lightgreen' : '#ffffff',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = () => ({
  background: 'black',
  padding: grid,
  width: 250,
});

export default () => {
  const [items, setItems] = useState<any>(getItems(11));

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(items, result.source.index, result.destination.index);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className={styles['wetrial-form-design']}>
        <aside className="components">
          <div className="component-item-group">基本组件</div>
          <div className="component-item">aaa</div>
          <div className="component-item">bbb</div>
        </aside>
        <section className="design-container">
          <header className="header">header</header>
          <main className="design">
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  // provided.droppableProps应用的相同元素.
                  {...provided.droppableProps}
                  // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                  ref={provided.innerRef}
                  style={getListStyle()}
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(sp, sn) => (
                        <div
                          ref={sp.innerRef}
                          {...sp.draggableProps}
                          {...sp.dragHandleProps}
                          style={getItemStyle(sn.isDragging, sp.draggableProps.style)}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </main>
        </section>
        <aside className="prop">props</aside>
      </section>
    </DragDropContext>
  );
};
