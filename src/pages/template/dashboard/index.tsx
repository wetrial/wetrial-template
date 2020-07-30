import React from 'react';
import { useAccess, Access, useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { DatePicker, Button } from 'antd';
import { Permissions } from '@config/routes';

export default (): React.ReactNode => {
  const model = useModel('@@initialState');
  const access = useAccess();

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
      <Button
        onClick={() => {
          model.refresh();
        }}
      >
        刷新权限
      </Button>
      <br />
      <Access accessible={access[Permissions.template.dashboard.index]} fallback="无权限">
        有权限才能看到的信息
      </Access>
    </PageContainer>
  );
};
