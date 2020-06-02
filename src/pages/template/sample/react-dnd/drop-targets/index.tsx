import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Dusbin from './Dusbin';
import Box from './Box';

export default () => {
  return (
    <div style={{ overflow: 'hidden', clear: 'both', margin: '-1rem' }}>
      <DndProvider backend={HTML5Backend}>
        <Dusbin greedy>
          <Dusbin greedy>
            <Dusbin greedy />
          </Dusbin>
        </Dusbin>
        <Dusbin>
          <Dusbin>
            <Dusbin />
          </Dusbin>
        </Dusbin>
        <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
          <Box />
        </div>
      </DndProvider>
    </div>
  );
};
