import { PaginationProps } from 'antd/es/pagination/Pagination';
import { SorterResult } from 'antd/es/table';

import React, { PureComponent } from 'react';
import { isEqual, omit } from 'lodash';
import { Throttle } from 'lodash-decorators';
import { PAGE_SIZE } from '@/constants';

type PagedTableHocProps = {
  type: string; // 类型 一般指获取数据源的action
  page?: number; // 当前页 从1开始
  pageSize?: number; // 每页显示数量
  record?: boolean; // 是否记录搜索状态
};

const Index = (prop: PagedTableHocProps): any => WrapComponent => {
  prop = {
    page: 1,
    pageSize: PAGE_SIZE,
    record: true,
    ...prop,
  };

  //   const filterParams = params =>
  //     reduce(
  //       params,
  //       (result, value, key) => {
  //         if (!['_t'].includes(key)) {
  //           result[key] = value;
  //         }
  //         return result;
  //       },
  //       {}
  //     );

  class Decorator extends PureComponent<any, any> {
    static getDerivedStateFromProps(nextProps, prevState) {
      const { location } = nextProps;

      const query:any = { page: prop.page, pageSize: prop.pageSize, ...location.query };

      if (!isEqual(query, prevState)) {
        const preQuery={};
        Object.keys(prevState).map(key=>{
            preQuery[key]=undefined;
        });
        query.pageSize = Number(query.pageSize);
        query.page = Number(query.page);
        return {...preQuery,...query}; // omit(query, ['_t']);
      }
      return null;
    }

    state = {
      page: prop.page,
      pageSize: prop.pageSize,
      order: false,
    };

    private wrapC: any;

    componentDidMount() {
      this.getPagedData();
    }

    componentDidUpdate(_, __, snapShot) {
      const { urlChange } = snapShot;
      if (urlChange) {
        this.getPagedData();
      }
    }

    getSnapshotBeforeUpdate(preProps) {
      const {
        location: { query, state: locationState },
      } = preProps;
      const {
        location: { query: curQuery, state: curLocationState },
      } = this.props;
      const snapShot: any = {};
      if (!isEqual(query, curQuery) || !isEqual(locationState, curLocationState)) {
        snapShot.urlChange = true;
      }
      return snapShot;
    }

    componentWillUnmount() {
      const { location } = this.props;
      if (prop.record) {
        sessionStorage.setItem(location.pathname, location.search);
      }
    }

    onSearchData = values => {
      const {
        location: { pathname, query },
      } = this.props;
      let newQuery = {
        ...query,
        ...values,
        page: 1,
      };
      newQuery = this.getSimpleQuery(newQuery);
      // @ts-ignore
      window.g_history.push({
        pathname,
        query: newQuery,
        state: {
          _t: new Date().getTime(),
        },
      });
    };

    getSimpleQuery = query => {
      if (query.page === 1) {
        delete query.page;
      }
      if (query.pageSize === PAGE_SIZE) {
        delete query.pageSize;
      }
      return query;
    };

    handleTableChange = (pagination: PaginationProps, _, sorter: SorterResult<any>) => {
      const {
        location: { pathname, query },
      } = this.props;

      let newQuery: any = {
        ...query,
        page: pagination.current,
        pageSize: pagination.pageSize,
      };
      if (sorter.field) {
        newQuery.order = `${sorter.field} ${
          sorter.order.toLowerCase() === 'ascend' ? 'asc' : 'desc'
        }`;
      } else {
        newQuery.order = undefined;
      }
      newQuery = this.getSimpleQuery(newQuery);
      // @ts-ignore
      window.g_history.push({
        pathname,
        query: newQuery,
      });
    };

    handleResetData = () => {
      const {
        location: { query },
        form: { getFieldsValue, setFieldsValue },
      } = this.props;
      if (Object.keys(query)) {
        const resetFileds: any = {};
        Object.keys(getFieldsValue()).map(key => {
          resetFileds[key] = undefined;
        });
        setFieldsValue(resetFileds);
        // @ts-ignore
        window.g_history.push({
          pathname: location.pathname,
          query: {},
          state: {
            _t: new Date().getTime(),
          },
        });
      }
    };

    @Throttle(1000)
    getPagedData() {
      let pageSearchParams = {};
      if (this.wrapC.getQueryParams) {
        pageSearchParams = this.wrapC.getQueryParams();
      }
      const params = this.state; // filterParams(this.state);
      this.props.dispatch({
        type: prop.type,
        payload: {
          ...pageSearchParams,
          ...params,
        },
      });
    }

    getSorter = () => {
      const { order } = this.state;
      if (order) {
        const orderData = `${order}`.split(' ');
        return {
          field: orderData[0],
          order: orderData[1] === 'asc' ? 'ascend' : orderData[1] === 'desc' ? 'descend' : false,
        };
      } else {
        return null;
      }
    };

    render() {
      const { page, pageSize } = this.state;
      const filterData = omit(this.state, ['page', 'pageSize', 'order']);
      const sorter = this.getSorter();
      return (
        <WrapComponent
          ref={c => (this.wrapC = c)}
          {...this.props}
          pagination={{
            defaultCurrent: 1,
            pageSize,
            current: page,
            // onChange:this.handlePageChange
          }}
          filterData={filterData}
          sorter={sorter}
          // getSortOrder={this.getSortOrder}
          onResetData={this.handleResetData}
          onSearchData={this.onSearchData}
          onTableChange={this.handleTableChange}
        />
      );
    }
  }

  return Decorator;
};

export default Index;
