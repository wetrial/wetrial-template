import { setToken } from '@/utils/authority';
import { PageContainer } from '@ant-design/pro-layout';
import { Permissions } from '@config/routes';
import { Button, DatePicker, Divider } from 'antd';
import React from 'react';
import { Access, useAccess, useModel } from 'umi';

export default (): React.ReactNode => {
  const access = useAccess();
  const { refresh } = useModel('@@initialState');

  // 模拟切换用户角色
  const handleToggleRole = async (token: '00000' | '10000') => {
    setToken({
      token,
    });
    await refresh();
  };

  return (
    <PageContainer
      title="看板页"
      breadcrumb={undefined}
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
    >
      <DatePicker />
      <br />
      <br />
      <Access accessible={access[Permissions.template.dashboard.index]} fallback="无权限">
        {JSON.stringify(access, null, 4)}
      </Access>
      <Divider />
      <Button onClick={handleToggleRole.bind(null, '10000')}>管理员权限</Button>
      <Button onClick={handleToggleRole.bind(null, '00000')}>普通权限</Button>
    </PageContainer>
  );
};
