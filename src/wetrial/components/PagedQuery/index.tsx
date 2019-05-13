import { PaginationProps } from 'antd/es/pagination/Pagination';
import { SorterResult } from 'antd/es/table';

import React, { PureComponent } from 'react';
import { isEqual, reduce,omit } from 'lodash';
import { PAGE_SIZE } from '@/constants';

type PagedTableHocProps = {
  type: string; // 类型 一般指获取数据源的action
  current?: number; // 当前页 从1开始
  pageSize?: number; // 每页显示数量
  record?: boolean; // 是否记录搜索状态
};

const Index = (prop: PagedTableHocProps): any => WrapComponent => {
  prop = {
    current: 1,
    pageSize: PAGE_SIZE,
    record: true,
    ...prop,
  };

  const filterParams = params =>
    reduce(
      params,
      (result, value, key) => {
        if (!['_t'].includes(key)) {
          result[key] = value;
        }
        return result;
      },
      {}
    );

  class Decorator extends PureComponent<any, any> {
    static getDerivedStateFromProps(nextProps, prevState) {
      const { location } = nextProps;

      const query = { page: prop.current, num: prop.pageSize, ...location.query };
      if (!isEqual(query, prevState)) {
        query.pageSize=Number(query.pageSize);
        query.page=Number(query.page);
        return omit(query, ['_t']);;
      }
      return null;
    }

    state = {
      page: prop.current,
      pageSize: prop.pageSize,
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
      // @ts-ignore
      window.g_history.push({
        pathname,
        query: {
          ...query,
          ...values,
          page:1,
          _t: new Date().getTime(),
        },
      });
    };

    // handlePageChange = (page: number, pageSize?: number): void => {
    //   debugger;
    //   const {
    //     location: { pathname, query },
    //   } = this.props;
    //   // @ts-ignore
    //   window.g_history.push({
    //     pathname,
    //     query: {
    //       ...query,
    //       page,
    //       pageSize,
    //       _t: new Date().getTime(),
    //     },
    //   });
    // };

    handleTableChange = (pagination: PaginationProps, _, sorter: SorterResult<any>) => {
      const {
        location: { pathname, query },
      } = this.props;
      const params:any={
        page:pagination.current,
        pageSize:pagination.pageSize
      }
      if(sorter.field){
          params.order=`${sorter.field} ${sorter.order.toLowerCase() === 'ascend' ? 'asc' : 'desc'}`;
      }else{
          query.order=undefined;
      }
      // @ts-ignore
      window.g_history.push({
        pathname,
        query: {
          ...query,
          ...params,
        },
      });
    };

    handleResetData = () => {
      const {
        location: { query },
      } = this.props;
      if (Object.keys(query)) {
        // @ts-ignore
        window.g_history.push({
          pathname: location.pathname,
          query: {},
        });
      }
    };

    getPagedData = () => {
      let pageSearchParams = {};
      if (this.wrapC.getQueryParams) {
        pageSearchParams = this.wrapC.getQueryParams();
      }
      const params = filterParams(this.state);
      this.props.dispatch({
        type: prop.type,
        payload: {
          ...pageSearchParams,
          ...params,
        },
      });
    };

    getSortOrder=()=>{
        const {}=this.state.order;
    }

    render() {
        const {page,pageSize}=this.state;
      return (
        <WrapComponent
          ref={c => (this.wrapC = c)}
          {...this.props}
          pagination={{
            defaultCurrent:1,
            pageSize,
            current: page,
            // onChange:this.handlePageChange
          }}
          getSortOrder={this.getSortOrder}
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
