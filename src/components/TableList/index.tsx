import { TableProps } from 'antd/lib/table';

import React from 'react';
import { Table } from 'antd';
import { PureComponent } from '@/wetrial';

export default class TableList extends PureComponent<TableProps<any>> {
  render() {
    return <Table rowKey="id" {...this.props} />;
  }
}
