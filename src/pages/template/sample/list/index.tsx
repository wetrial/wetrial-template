import { PAGE_PROPS } from '@/constants';
import { ProFormDatePicker, ProFormText, QueryFilter } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Permissions } from '@config/routes';
import { ProTable } from '@wetrial/component';
import type { ProColumns } from '@wetrial/component/lib/ProTable/interface';
import { useFormTable } from '@wetrial/hooks';
import { useRequest } from 'ahooks';
import { Button, Form, Popconfirm, Space, Tag } from 'antd';
import React, { useCallback } from 'react';
import { Access, Link, useAccess, useLocation } from 'umi';
import type { IGitHubIssue } from './prop.d';
import { getList, remove } from './service';

export default () => {
  const [form] = Form.useForm();
  const access = useAccess();
  const { pathname } = useLocation();

  const { tableProps, search, sorter, refresh } = useFormTable(getList, {
    form,
    cacheKey: pathname,
  });

  const { run: removeItem } = useRequest(remove, { manual: true });

  const { type, changeType, submit, reset } = search || {};

  const handleDelete = useCallback(
    (id) => {
      removeItem({ id }).then(() => {
        refresh();
      });
    },
    [refresh, removeItem],
  );

  const columns: ProColumns<IGitHubIssue> = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 65,
      valueType: 'indexBorder',
    },
    {
      title: '标题',
      dataIndex: 'title',
      sorter: true,
      sortOrder: sorter.field === 'title' && sorter.order,
      copyable: true,
      width: 180,
      render: (value, record) => (
        <a target="_blank" href={`${record.url}`}>
          {value}
        </a>
      ),
    },
    {
      title: '标签',
      dataIndex: 'labels',
      width: 200,
      render: (_, record) => (
        <Space>
          {record.labels?.map(({ label, color }) => (
            <Tag color={color} key={label}>
              {label}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueType: 'select',
      valueEnum: {
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
        processing: {
          text: '解决中',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      width: 180,
      sorter: true,
      sortOrder: sorter.field === 'createdTime' && sorter.order,
      valueType: 'dateTime',
    },
    {
      title: '关闭时间',
      dataIndex: 'closeTime',
      width: 180,
      sorter: true,
      sortOrder: sorter.field === 'closeTime' && sorter.order,
      valueType: 'dateTime',
    },
    {
      title: '评论数',
      width: 100,
      dataIndex: 'comments',
      sorter: true,
      sortOrder: sorter.field === 'comments' && sorter.order,
      valueType: 'digit',
    },
    {
      title: '内容',
      dataIndex: 'content',
      sorter: true,
      sortOrder: sorter.field === 'content' && sorter.order,
      ellipsis: true,
      valueType: 'text',
    },
    {
      title: '责任人',
      dataIndex: 'assigner',
      width: 120,
      sorter: true,
      sortOrder: sorter.field === 'assigner' && sorter.order,
    },
    {
      title: '当前进度',
      dataIndex: 'progress',
      sorter: true,
      width: 180,
      sortOrder: sorter.field === 'progress' && sorter.order,
      valueType: 'progress',
    },
    {
      title: '打赏额度',
      dataIndex: 'money',
      sorter: true,
      width: 160,
      sortOrder: sorter.field === 'money' && sorter.order,
      valueType: 'money',
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 120,
      valueType: 'option',
      render: (_, record) => [
        <Access key="edit" accessible={access[Permissions.template.sample.list.edit]}>
          <Button size="small" type="link">
            <Link to={`edit/${record.id}`}>编辑</Link>
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

  return (
    <PageContainer
      title="基础使用"
      breadcrumb={undefined}
      extra={[
        <Button key="1">
          <Link to="edit/">新增</Link>
        </Button>,
      ]}
      content={
        <QueryFilter
          submitter={{
            onSubmit: submit,
            onReset: reset,
          }}
          form={form}
          onCollapse={changeType}
          collapsed={type === 'simple'}
        >
          <ProFormText name="name" label="标题" />
          <ProFormDatePicker name="createdTime" label="创建时间" />
          <ProFormText name="status" label="状态" />
          <ProFormDatePicker name="updatedTime" label="更新日期" />
          <ProFormDatePicker name="enddate" label="结束时间" />
        </QueryFilter>
      }
    >
      <ProTable
        rowKey="id"
        {...tableProps}
        pagination={{ ...PAGE_PROPS, ...tableProps.pagination }}
        columns={columns}
      />
    </PageContainer>
  );
};
