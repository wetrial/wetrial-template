import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

export default () => {
  const [state, setState] = useState([getItems(10), getItems(5, 10)]);

  function onDragEnd(dropResult, provider) {
    console.log(dropResult, provider);
    const { source, destination } = dropResult;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    console.log(sInd, dInd);
    // 内部换顺序
    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState: any[] = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const newResult = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = newResult[sInd];
      newState[dInd] = newResult[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  const onDrugStart = (initState) => {
    console.log('onDrugStart', initState);
  };

  const onDragUpdate = (initState) => {
    console.log('onDragUpdate', initState);
  };

  return (
    <div>
      <Space>
        <Button
          onClick={() => {
            setState([...state, []]);
          }}
        >
          增加阶段
        </Button>
        <Button
          onClick={() => {
            setState([...state, getItems(1)]);
          }}
        >
          增加阶段(带默认项)
        </Button>
      </Space>
      <div style={{ display: 'flex' }}>
        <DragDropContext
          onDragStart={onDrugStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(subProvided, subSnapshot) => (
                        <div
                          ref={subProvided.innerRef}
                          {...subProvided.draggableProps}
                          {...subProvided.dragHandleProps}
                          style={getItemStyle(
                            subSnapshot.isDragging,
                            subProvided.draggableProps.style,
                          )}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-around',
                            }}
                          >
                            {item.content}
                            <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(newState.filter((group) => group.length));
                              }}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};
