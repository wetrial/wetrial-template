import { TableProps, ColumnProps } from 'antd/lib/table';

import React from 'react';
import { Table } from 'antd';
import { PureComponent } from 'wetrial';
import { isEqual } from 'lodash';
import memoizeOne from 'memoize-one';
import { TABLE_SCROLL_WIDTH } from '@/constants';

type SortOrderType = {
  field: string;
  order: 'ascend' | 'descend' | false;
};
interface TableListProps<T> extends TableProps<T> {
  sorter: SortOrderType;
}

const getColumns = (
  columns: ColumnProps<any>[],
  sortOrder: SortOrderType,
) => {
  columns.forEach(item => {
    const newItem=item;
    if (sortOrder && sortOrder.order) {
      newItem.sortOrder = sortOrder.order;
    } else {
      newItem.sortOrder = false;
    }
    return newItem;
  });
  return columns;
};

const momoizeOneGetColumns = memoizeOne(getColumns, isEqual);

export default class TableList extends PureComponent<TableListProps<any>> {
  render() {
    const { columns, sorter } = this.props;
    return (
      <Table
        scroll={{ x: TABLE_SCROLL_WIDTH }}
        rowKey="id"
        {...this.props}
        columns={momoizeOneGetColumns(columns, sorter)}
      />
    );
  }
}
