import { ColumnProps } from 'antd/lib/table';

import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Button, Card, Input, Checkbox, Popconfirm, Divider } from 'antd';
import { FormComponent,pagedQuery } from '@/wetrial';
import TableList from "@/components/TableList";
import Authorized from '@/utils/Authorized';
import Permissions from '@/constants/permissions';
import { getDateString } from '@/utils';


const FormItem = Form.Item;

@connect(({ example_tenant: { pagedData }, loading }) => ({
  pagedData,
  loading: loading.effects['example_tenant/getTenants'],
}))
@Form.create()
@pagedQuery({type:'example_tenant/getTenants',pageSize:2})
class Index extends FormComponent<any,any> {
  columns: Array<ColumnProps<any>> = [
    {
      title: '租户编码',
      fixed: 'left',
      width: 160,
      sorter:true,
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
      width: 130,
      render: (_) => {
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
    }
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
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={10}>
          <Col span={10}>
            <FormItem label="查询">
              {getFieldDecorator('filter', {
                initialValue: '',
              })(<Input placeholder="查询" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={10}>
            <FormItem>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
              <Button style={{ marginLeft: 10 }} onClick={onResetData}>
                重置
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  };

  render() {
    const { pagination,onTableChange, loading, pagedData } = this.props;
    console.log(this.props);
    return (
      <Card style={{ margin: 16 }}>
        <div>{this.renderForm()}</div>
        <div style={{ marginTop: 20 }}>
          <TableList
            loading={loading}
            columns={this.columns}
            dataSource={pagedData.items}
            onChange={onTableChange}
            pagination={{
              total: pagedData.total,
              ...pagination
            }}
          />
        </div>
      </Card>
    );
  }
}

export default Index;