import { PageContainer } from '@ant-design/pro-layout';
import { Divider } from 'antd';
import React from 'react';
import { useModel } from 'umi';

export default (): React.ReactNode => {
  const { countrys } = useModel('dict', (model) => ({
    countrys: model.countrys,
  }));

  return (
    <PageContainer title="测试共享数据" breadcrumb={undefined}>
      当前页面的数据会自动拉取，而且只会拉取一次
      <Divider />
      {JSON.stringify(countrys)}
    </PageContainer>
  );
};
