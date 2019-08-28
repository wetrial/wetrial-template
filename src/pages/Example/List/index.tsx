import { ColumnProps } from 'antd/lib/table';

import React, { Fragment, Suspense } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import {
  Form,
  Row,
  Col,
  Button,
  Card,
  Input,
  Checkbox,
  Popconfirm,
  Divider,
  Select,
  message,
} from 'antd';
import { FormComponent, withPagedQuery } from 'wetrial';
import TableList from '@/components/TableList';
import Authorized from '@/utils/Authorized';
import Permissions from '@config/permissions';
import { getDateString } from '@/utils';

import { IListProps } from './props';

const FormItem = Form.Item;
const ViewPage = React.lazy<any>(() => import('./View'));

@connect(({ example_tenant: { pagedData }, loading }) => ({
  pagedData,
  loading: loading.effects['example_tenant/getTenants'],
}))
// @ts-ignore
@Form.create()
// @ts-ignore
@withPagedQuery({
  type: 'example_tenant/getTenants',
  pageSize: 3,
  // // 修改发送的默认参数
  // changeParams: params => {
  //   const result = params;
  //   result.limit = result.pageSize;
  //   result.pageIndex = result.page;
  //   delete result.pageSize;
  //   delete result.page;
  //   return result;
  // },
  ignoreQueryKeys: ['_id'],
})
class Index extends FormComponent<IListProps> {
  columns: ColumnProps<any>[] = [
    {
      title: '租户编码',
      sorter: true,
      dataIndex: 'tenancyName',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '版本',
      dataIndex: 'editionDisplayName',
    },
    {
      title: '激活',
      dataIndex: 'isActive',
      render: (actived: boolean) => {
        return <Checkbox checked={actived} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'creationTime',
      render: value => {
        return getDateString({ date: value, format: 'Y-MM-DD H:m' });
      },
    },
    {
      title: '操作',
      dataIndex: 'operator',
      fixed: 'right',
      width: 240,
      render: (_, record) => {
        return (
          <Fragment>
            <Authorized authority={Permissions.example.list}>
              <Button
                onClick={this.handleToggleView.bind(this, record.id)}
                size="small"
                icon="eye"
                type="default"
              >
                查看
              </Button>
            </Authorized>
            <Authorized authority={Permissions.example.list}>
              <Divider type="vertical" />
              <Button
                size="small"
                onClick={() => {
                  this.handleCreateOrEditTenant(record.id);
                }}
                type="primary"
              >
                编辑
              </Button>
            </Authorized>
            <Authorized authority={Permissions.example.list}>
              <Divider type="vertical" />
              <Popconfirm title="确定删除">
                <Button size="small" type="danger">
                  删除
                </Button>
              </Popconfirm>
            </Authorized>
          </Fragment>
        );
      },
    },
  ];

  // 设置默认搜索值(注意写法)
  setDefaultFilter() {
    return {
      type: '3',
      filter: 'test',
    };
  }

  handleToggleView = (_id?: string) => {
    const {
      location: { query },
    } = this.props;

    router.replace({
      pathname: '/example/list',
      query: {
        ...query,
        _id,
      },
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { form, triggerSearch } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      triggerSearch(values);
    });
  };

  handleCreateOrEditTenant = id => {
    router.push({
      pathname: `/example/list/${id}`,
    });
  };

  handleCloseView = result => {
    if (result) {
      message.success('点击了确定按钮');
    } else {
      message.warn('点击了取消按钮');
    }
    this.handleToggleView();
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      onResetData,
      filterData,
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={5}>
          <Col xxl={{ span: 4 }} xl={{ span: 6 }} lg={{ span: 12 }} sm={24} xs={24}>
            <FormItem>
              {getFieldDecorator('filter', {
                initialValue: filterData.filter,
              })(<Input autoComplete="off" placeholder="输入以搜索" />)}
            </FormItem>
          </Col>
          <Col xxl={{ span: 4 }} xl={{ span: 6 }} lg={{ span: 12 }} sm={24} xs={24}>
            <FormItem>
              {getFieldDecorator('type', {
                initialValue: filterData.type,
              })(
                <Select placeholder="请选择">
                  <Select.Option value="1">vip</Select.Option>
                  <Select.Option value="2">普通</Select.Option>
                  <Select.Option value="3">皇冠</Select.Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col
            xxl={{ span: 16 }}
            xl={{ span: 12 }}
            lg={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <FormItem>
              <Row type="flex" align="middle" justify="space-between">
                <div>
                  <Button type="primary" onClick={this.handleSearch}>
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={onResetData}>
                    重置
                  </Button>
                </div>
                <Authorized authority={Permissions.example.list}>
                  <Button
                    type="primary"
                    icon="plus"
                    onClick={() => this.handleCreateOrEditTenant('')}
                  >
                    创建
                  </Button>
                </Authorized>
              </Row>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  };

  render() {
    const {
      pagination,
      onTableChange,
      sorter,
      loading,
      pagedData,
      location: {
        query: { _id },
      },
    } = this.props;
    return (
      <Card>
        {this.renderForm()}

        <TableList
          loading={loading}
          columns={this.columns}
          dataSource={pagedData.items}
          onChange={onTableChange}
          sorter={sorter}
          pagination={{
            total: pagedData.total,
            ...pagination,
          }}
        />
        {_id ? (
          <Suspense fallback={null}>
            <ViewPage onClose={this.handleCloseView} id={_id} />
          </Suspense>
        ) : null}
      </Card>
    );
  }
}
export default Index;
