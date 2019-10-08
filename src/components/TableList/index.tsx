import { ColumnProps } from 'antd/lib/table';

import React from 'react';
import { Table } from 'antd';
import { PureComponent } from 'wetrial';
import { isEqual } from 'lodash';
import memoizeOne from 'memoize-one';
import { TABLE_SCROLL_WIDTH, PAGE_PROPS } from '@/constants';

type SortOrderType = {
  field: string;
  order: 'ascend' | 'descend' | false;
};

const getColumns = (columns: ColumnProps<any>[], sortOrder: SortOrderType) => {
  columns.map(item => {
    const row = item;
    if (sortOrder && sortOrder.order) {
      row.sortOrder = sortOrder.order;
    } else {
      row.sortOrder = false;
    }
    return row;
  });
  return columns;
};

const momoizeOneGetColumns = memoizeOne(getColumns, isEqual);

export default class TableList extends PureComponent<any> {
  showTotalInfo = (total, range) => {
    if (this.props.pagination && this.props.pagination.showTotal) {
      return this.props.pagination.showTotal(total, range, this.props.pagination.pageSize);
    } else {
      return PAGE_PROPS.showTotal(total, range, this.props.pagination.pageSize);
    }
  };

  render() {
    const { columns, sorter } = this.props;
    return (
      <Table
        scroll={{ x: TABLE_SCROLL_WIDTH }}
        rowKey="id"
        {...this.props}
        pagination={{
          ...PAGE_PROPS,
          ...this.props.pagination,
          showTotal: this.showTotalInfo,
        }}
        columns={momoizeOneGetColumns(columns, sorter)}
      />
    );
  }
}
