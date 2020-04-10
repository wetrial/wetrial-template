import React from 'react';
import { useFormTable, useResponsive } from '@wetrial/hooks';
import { useRequest } from '@umijs/hooks';
import { ConnectProps, useAccess, Access, Link } from 'umi';
import { memoize } from 'lodash';
import { Button, Form, Input, Table, Divider, Progress, Switch, Popconfirm } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';
import { convertListToFlat } from '@/utils';
import { Permissions } from '@config/routes';
import { StagedDict } from './prop.d';
import { getList, remove } from './service';

const stagedDictFunc = memoize(convertListToFlat);

export default (props: ConnectProps) => {
  const [form] = Form.useForm();
  const {
    location: { pathname },
  } = props;

  const { size } = useResponsive();
  const access = useAccess();

  const { tableProps, search, sorter, refresh } = useFormTable(getList, {
    defaultPageSize: 15,
    form,
    cacheKey: pathname,
  });

  const { run: removeItem } = useRequest(remove, { manual: true });

  const stagedDict = stagedDictFunc(StagedDict, 'value', 'label');

  const { type, changeType, submit, reset } = search || {};

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
        <>
          <Access accessible={access[Permissions.template.sample.list.edit]}>
            <Button size="small" type="primary">
              <Link to={`list/edit/${record.id}`}>编辑</Link>
            </Button>
          </Access>
          <Access
            accessible={
              access[Permissions.template.sample.list.edit] &&
              access[Permissions.template.sample.list.delete]
            }
          >
            <Divider type="vertical" />
          </Access>
          <Access accessible={access[Permissions.template.sample.list.delete]}>
            <Popconfirm title="确定要删除" onConfirm={handleDelete.bind(null, record.id)}>
              <Button size="small" type="danger">
                删除
              </Button>
            </Popconfirm>
          </Access>
        </>
      ),
    },
  ];

  const searchFrom = (
    <div style={{ marginBottom: 16 }}>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item name="name">
          <Input placeholder="姓名" autoComplete="off" style={{ width: 140, marginRight: 16 }} />
        </Form.Item>

        {type === 'advance' && (
          <>
            <Form.Item name="title">
              <Input placeholder="邮箱" style={{ width: 140, marginRight: 16 }} />
            </Form.Item>
            <Form.Item name="desc">
              <Input placeholder="描述" style={{ width: 140, marginRight: 16 }} />
            </Form.Item>
          </>
        )}
        <Button type="primary" onClick={submit}>
          查询
        </Button>
        <Button onClick={reset} style={{ marginLeft: 8 }}>
          重置
        </Button>
        <Button type="link" onClick={changeType}>
          {type === 'simple' ? '展开' : '折叠'}
        </Button>
        <Button type="link" style={{ marginLeft: 8 }}>
          <Link to="list/edit/">添加</Link>
        </Button>
      </Form>
    </div>
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
