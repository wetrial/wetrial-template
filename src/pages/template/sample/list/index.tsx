import React from 'react';
import { useFormTable, formatFormTableParams } from '@wetrial/hooks';
import { useRequest } from 'ahooks';
import { useLocation, useAccess, Access, Link } from 'umi';
import { memoize } from 'lodash';
import { Button, Form, Input, Switch, Popconfirm, Row, Col, Space, Tooltip } from 'antd';
import { CloseOutlined, CheckOutlined, MoreOutlined } from '@ant-design/icons';
import { ProTable } from '@wetrial/component';
import { PageContainer } from '@ant-design/pro-layout';
import { ProColumns } from '@wetrial/component/es/ProTable';
import { listToFlat } from '@wetrial/core/es/utils';
import { Permissions } from '@config/routes';
import { StagedDict } from './prop.d';
import { LAYOUT_FORM_TWO, LAYOUT_COL_SEARCH_SIX } from '@/constants';
import { getList, remove } from './service';

const stagedDict = memoize(listToFlat)(StagedDict);

export default () => {
  const [form] = Form.useForm();
  const { pathname } = useLocation();

  const access = useAccess();

  const { tableProps, search, sorter, refresh } = useFormTable(
    (paginatedParams, formData) => getList(formatFormTableParams(paginatedParams, formData)),
    {
      form,
      cacheKey: pathname,
    },
  );

  const { run: removeItem } = useRequest(remove, { manual: true });

  const { type, changeType, submit, reset } = search || {};

  const handleDelete = (id) => {
    removeItem({ id }).then(() => {
      refresh();
    });
  };

  const columns: ProColumns[] = [
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
      valueType: 'progress',
      // render: (progress) => (
      //   <Progress
      //     status="active"
      //     strokeLinecap="butt"
      //     trailColor="rgb(226, 201, 201)"
      //     percent={progress}
      //     size="small"
      //     format={(percent) => `${percent}%`}
      //   />
      // ),
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
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record) => [
        <Access key="edit" accessible={access[Permissions.template.sample.list.edit]}>
          <Button size="small" type="link">
            <Link to={`list/edit/${record.id}`}>编辑</Link>
          </Button>
        </Access>,
        <Access key="del" accessible={access[Permissions.template.sample.list.delete]}>
          <Popconfirm title="确定要删除" onConfirm={handleDelete.bind(null, record.id)}>
            <Button size="small" type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Access>,
      ],
    },
  ];

  const simpleSearchForm = () => (
    <Form key="search-form" className="wt-simple-search-form" layout="inline" form={form}>
      <Form.Item name="search">
        <Input.Search
          allowClear
          placeholder="请输入姓名或者邮箱"
          enterButton
          suffix={
            <Tooltip title="更多搜索条件">
              <Button onClick={changeType} size="small" type="link" icon={<MoreOutlined />} />
            </Tooltip>
          }
          onSearch={submit}
        />
      </Form.Item>
    </Form>
  );

  const advanceSearchForm = () => (
    <Form {...LAYOUT_FORM_TWO} form={form}>
      <Row>
        <Col {...LAYOUT_COL_SEARCH_SIX}>
          <Form.Item label="姓名" name="name">
            <Input autoComplete="off" placeholder="姓名" />
          </Form.Item>
        </Col>
        <Col {...LAYOUT_COL_SEARCH_SIX}>
          <Form.Item label="邮箱" name="title">
            <Input autoComplete="off" placeholder="邮箱" />
          </Form.Item>
        </Col>
        <Col {...LAYOUT_COL_SEARCH_SIX}>
          <Form.Item label="描述" name="desc">
            <Input autoComplete="off" placeholder="描述" />
          </Form.Item>
        </Col>
        <Form.Item className="wt-advance-search-form-operator">
          <Space>
            <Button type="primary" onClick={submit}>
              查询
            </Button>
            <Button onClick={reset}>重置</Button>
            <Button type="link" onClick={changeType}>
              折叠
            </Button>
          </Space>
        </Form.Item>
      </Row>
    </Form>
  );

  return (
    <PageContainer
      breadcrumb={undefined}
      title="列表页"
      extra={[
        type === 'simple' ? simpleSearchForm() : undefined,
        <Button key="1">
          <Link to="list/edit/">新增</Link>
        </Button>,
      ]}
    >
      <ProTable
        columns={columns}
        rowKey="id"
        searchType={type}
        renderSearch={advanceSearchForm}
        {...tableProps}
      />
    </PageContainer>
  );
};
