import H from 'history';
import { TableProps } from 'antd/lib/table';

import React, { Fragment } from 'react';
import { Table } from 'antd';
import router from 'umi/router';
import { isEqual, reduce } from 'lodash';
import { PureComponent } from '@/wetrial';
import { PAGE_SIZE, PAGE_PROPS, TABLE_SCROLL_WIDTH } from '@/constants';

export interface PagedTableProps<T> extends TableProps<T> {
  location: H.Location & { query: object };
  getPagedList: (filters) => Promise<any>;
  pagedData: {
    items: any[];
    total: number;
  };
}

class Index extends PureComponent<PagedTableProps<any>, any> {
  static getDerivedStateFromProps(nextProps, preStatus) {
    const {
      location: { query },
    } = nextProps;
    const { filters } = preStatus;
    if (!isEqual(query, filters)) {
      return {
        filters: query,
      };
    }
    return null;
  }

  state = {
    filters: {
      filter: '',
    },
    pagination: {
      current: 1,
      // sorting:''
    },
  };

  componentDidMount() {
    this.queryPagination();
  }

  componentDidUpdate(_, __, snapShot) {
    const { urlChange } = snapShot;
    if (urlChange) {
      this.queryPagination();
    }
  }

  getSnapshotBeforeUpdate(preProps) {
    const {
      location: { query },
    } = preProps;
    const {
      location: { query: curQuery },
    } = this.props;
    const snapShot: any = {};
    if (!isEqual(query, curQuery)) {
      snapShot.urlChange = true;
    }
    return snapShot;
  }

  queryPagination = () => {
    const { getPagedList } = this.props;
    const { filters, pagination } = this.state;
    const queryData = reduce(
      filters,
      (result, value, key) => {
        if (!key.startsWith('_')) {
          result[key] = value;
        }
        return result;
      },
      {}
    );
    const currentPage = Number(filters['_page'] || 1);
    const pageSize = Number(filters['_pagesize'] || PAGE_SIZE);

    this.setState({
      pagination: {
        ...pagination,
        current: currentPage,
      },
    });

    getPagedList({
      ...queryData,
      skipCount: (currentPage - 1) * pageSize,
    });
  };

  handleTableChange = pagination => {
    const {
      location: { pathname, query },
    } = this.props;
    router.push({
      pathname,
      query: {
        ...query,
        _page: pagination.current,
        _t: new Date().getTime(),
      },
    });
  };

  // handleFormReset = () => {
  //     const { location: { query } } = this.props;
  //     if (Object.keys(query)) {
  //         router.push({
  //             pathname: location.pathname,
  //             query: {}
  //         });
  //     }
  // };

  render() {
    const {
      pagedData: { items, total },
      columns,
      rowKey,
    } = this.props;
    const {
      pagination: { current },
    } = this.state;
    return (
      <Fragment>
        <Table
          scroll={{ x: TABLE_SCROLL_WIDTH }}
          size="small"
          rowKey={rowKey || 'id'}
          onChange={this.handleTableChange}
          columns={columns}
          pagination={{
            ...PAGE_PROPS,
            pageSize: PAGE_SIZE,
            current,
            total,
          }}
          dataSource={items}
        />
      </Fragment>
    );
  }
}

export default Index;
