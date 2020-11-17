import { setToken } from '@/utils/authority';
import { PageContainer } from '@ant-design/pro-layout';
import { Permissions } from '@config/routes';
import { Button, Card, DatePicker, Divider } from 'antd';
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
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
    >
      <Card>
        <DatePicker />
        <Divider />
        当前权限:{JSON.stringify(access)}
        <Divider />
        <Access accessible={access[Permissions.template.sample.index]} fallback="无权限">
          有管理员权限才能看到的信息
        </Access>
        <Divider />
        <Button onClick={handleToggleRole.bind(null, '10000')}>管理员权限</Button>
        <Button onClick={handleToggleRole.bind(null, '00000')}>普通权限</Button>
      </Card>
    </PageContainer>
  );
};
