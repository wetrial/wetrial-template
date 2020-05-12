import React from 'react';
import { useFormTable, useResponsive, formatFormTableParams } from '@wetrial/hooks';
import { useRequest } from '@umijs/hooks';
import { ConnectProps, useAccess, Access, Link } from 'umi';
import { memoize } from 'lodash';
import { Button, Form, Input, Table, Progress, Switch, Popconfirm, Row, Col, Space } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';
import { listToFlat } from '@wetrial/core/utils';
import { LAYOUT_FORM_TWO, LAYOUT_COL_SEARCH_FOUR } from '@/constants';
import { Permissions } from '@config/routes';
import { StagedDict } from './prop.d';
import { getList, remove } from './service';

const stagedDict = memoize(listToFlat)(StagedDict);

export default (props: ConnectProps) => {
  const [form] = Form.useForm();
  const {
    location: { pathname },
  } = props;

  const { size } = useResponsive();
  const access = useAccess();

  const { tableProps, search, sorter, refresh } = useFormTable(
    (paginatedParams, formData) => getList(formatFormTableParams(paginatedParams, formData)),
    {
      form,
      cacheKey: pathname,
    },
  );

  const { run: removeItem } = useRequest(remove, { manual: true });

  const { submit, reset } = search || {};

  const handleDelete = (id) => {
    removeItem({ id }).then(() => {
      refresh();
    });
  };

  const columns: ColumnType<any>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 200,
      sorter: true,
      sortOrder: sorter.field === 'name' && sorter.order,
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 200,
      sorter: true,
      sortOrder: sorter.field === 'title' && sorter.order,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      width: 240,
      sorter: true,
      sortOrder: sorter.field === 'desc' && sorter.order,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      sorter: true,
      sortOrder: sorter.field === 'status' && sorter.order,
      render: (value) => (
        <Switch
          checked={value}
          disabled
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      ),
    },
    {
      title: '阶段',
      dataIndex: 'staged',
      width: 100,
      sorter: true,
      sortOrder: sorter.field === 'staged' && sorter.order,
      render: (value) => stagedDict[value],
    },
    {
      title: '进度',
      dataIndex: 'progress',
      width: 120,
      sorter: true,
      sortOrder: sorter.field === 'progress' && sorter.order,
      render: (progress) => (
        <Progress
          status="active"
          strokeLinecap="butt"
          trailColor="rgb(226, 201, 201)"
          percent={progress}
          size="small"
          format={(percent) => `${percent}%`}
        />
      ),
    },
    {
      title: '地址',
      dataIndex: 'address.street',
      ellipsis: true,
      render: (_, record) => {
        return record.address?.street;
      },
    },
    {
      title: '操作',
      dataIndex: 'operator',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Access accessible={access[Permissions.template.sample.list.edit]}>
            <Button size="small" type="primary">
              <Link to={`edit/${record.id}`}>编辑</Link>
            </Button>
          </Access>
          <Access accessible={access[Permissions.template.sample.list.delete]}>
            <Popconfirm title="确定要删除" onConfirm={handleDelete.bind(null, record.id)}>
              <Button size="small" type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];

  const searchFrom = (
    <Form {...LAYOUT_FORM_TWO} form={form}>
      <Row>
        <Col {...LAYOUT_COL_SEARCH_FOUR}>
          <Form.Item label="姓名" name="name">
            <Input autoComplete="off" placeholder="姓名" />
          </Form.Item>
        </Col>
        <Col {...LAYOUT_COL_SEARCH_FOUR}>
          <Form.Item label="邮箱" name="title">
            <Input autoComplete="off" placeholder="邮箱" />
          </Form.Item>
        </Col>
        <Col {...LAYOUT_COL_SEARCH_FOUR}>
          <Form.Item label="描述" name="desc">
            <Input autoComplete="off" placeholder="描述" />
          </Form.Item>
        </Col>
        <Form.Item className="wt-search-operator">
          <Space>
            <Button type="primary" onClick={submit}>
              查询
            </Button>
            <Button onClick={reset}>重置</Button>
            <Button type="link">
              <Link to="edit/">添加</Link>
            </Button>
          </Space>
        </Form.Item>
      </Row>
    </Form>
  );

  return (
    <>
      {searchFrom}
      <Table
        scroll={{ x: 1300, y: size.height - 80 }}
        columns={columns}
        rowKey="id"
        {...tableProps}
      />
    </>
  );
};
