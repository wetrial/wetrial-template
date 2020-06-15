import React, { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SourceBox from './SourceBox';
import TargetBox from './TargetBox';
import { Colors } from './Colors';

export default () => {
  const [cardList, changeCardList] = useState([
    {
      index: 0,
      color: Colors.BLUE,
      title: '1',
      childrens: [
        {
          index: 0,
          color: Colors.YELLOW,
          title: '1-1',
          childrens: [
            {
              index: 0,
              color: Colors.BLUE,
              title: '1-1-1',
            },
            {
              index: 1,
              color: Colors.YELLOW,
              title: '1-1-2',
            },
          ],
        },
        {
          index: 1,
          color: Colors.BLUE,
          title: '1-2',
          childrens: [
            {
              index: 0,
              color: Colors.YELLOW,
              title: '1-2-1',
            },
          ],
        },
      ],
    },
  ]);
  const moveBox = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      /**
       * 1、如果此时拖拽的组件是 Box 组件，则 dragIndex 为 undefined，则此时修改，则此时修改 cardList 中的占位元素的位置即可
       * 2、如果此时拖拽的组件是 Card 组件，则 dragIndex 不为 undefined，此时替换 dragIndex 和 hoverIndex 位置的元素即可
      //  */
      // if (dragIndex === undefined) {
      //  return
      // } else {
      //   const dragCard = cardList[dragIndex];
      //   changeCardList(
      //     update(cardList, {
      //       $splice: [
      //         [dragIndex, 1],
      //         [hoverIndex, 0, dragCard],
      //       ],
      //     }),
      //   );
      // }
      console.log(dragIndex, hoverIndex);
      // eslint-disable-next-line
    },
    [cardList],
  );

  const dgRenderBox = (boxs: any[]) => {
    return boxs.map((item) => {
      return (
        <SourceBox moveBox={moveBox} color={item.color} index={item.index} key={item.index}>
          {item.childrens && dgRenderBox(item.childrens)}
        </SourceBox>
      );
    });
  };

  const renderSourceBox = useCallback(() => {
    return dgRenderBox(cardList);
  }, [cardList]);

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
          <div style={{ float: 'left' }}>{renderSourceBox()}</div>

          <div style={{ float: 'left', marginLeft: '5rem', marginTop: '.5rem' }}>
            <TargetBox />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};
