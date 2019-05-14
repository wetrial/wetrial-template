import { ColumnProps } from 'antd/lib/table';

import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Button, Card, Input, Checkbox, Popconfirm, Divider, Select } from 'antd';
import { FormComponent, pagedQuery } from '@/wetrial';
import TableList from '@/components/TableList';
import Authorized from '@/utils/Authorized';
import Permissions from '@/constants/permissions';
import { getDateString } from '@/utils';

const FormItem = Form.Item;

@connect(({ example_tenant: { pagedData }, loading }) => ({
  pagedData,
  loading: loading.effects['example_tenant/getTenants'],
}))
@Form.create()
@pagedQuery({ type: 'example_tenant/getTenants', pageSize: 2 })
class Index extends FormComponent<any, any> {
  columns: Array<ColumnProps<any>> = [
    {
      title: '租户编码',
      fixed: 'left',
      width: 240,
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
      render: actived => {
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
      width: 145,
      render: _ => {
        return (
          <Fragment>
            <Authorized authority={Permissions.example.tenant}>
              <Button size="small" type="primary">
                编辑
              </Button>
            </Authorized>
            <Authorized authority={Permissions.example.tenant}>
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

  // getQueryParams = () => {
  //   return {};
  // };

  handleSearch = e => {
    e.preventDefault();
    const { form, onSearchData } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      onSearchData(values);
    });
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      onResetData,
      filterData,
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={{ md: 5, lg: 24, xl: 48 }}>
          <Col md={6} sm={12}>
            <FormItem>
              {getFieldDecorator('filter', {
                initialValue: filterData.filter,
              })(<Input autoComplete="off" placeholder="输入以搜索" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={12}>
            <FormItem>
              {getFieldDecorator('type', {
                initialValue: filterData.type,
              })(
                <Select placeholder="请选择">
                  <Select.Option value="1">vip</Select.Option>
                  <Select.Option value="2">普通</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={{span:6,offset:6}} sm={{span:12}}>
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
                  <Button type="primary" icon="plus">
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
    const { pagination, onTableChange, sorter, loading, pagedData } = this.props;
    return (
      <Card style={{ margin: 16 }}>
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
      </Card>
    );
  }
}

export default Index;
