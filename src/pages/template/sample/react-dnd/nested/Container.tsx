import React, { useState } from 'react';
import { IListData } from './IListData';
import Box from './Box';
import List from './List';

const boxs: IListData[] = [
  { id: 1, category: 'Apple', bg: 'red' },
  { id: 2, category: 'Banana', bg: 'yellow' },
  { id: 3, category: 'Orange', bg: 'orange' },
  { id: 4, category: 'Grape', bg: 'purple' },
  { id: 5, category: 'Watermelon', bg: 'green' },
  { id: 6, category: 'Peach', bg: 'pink' },
];
export default () => {
  const [cardList, setCardList] = useState<any[]>([]);

  const changeCardList = (list: any[]) => {
    setCardList([...list]);
  };
  return (
    <div>
      {boxs.map((item: IListData) => (
        <Box key={item.id} {...item} cardList={cardList} changeCardList={changeCardList} />
      ))}
      <List cardList={cardList} changeCardList={changeCardList} />
    </div>
  );
};
