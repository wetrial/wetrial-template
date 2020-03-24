import React from 'react';
import { ConfigProvider, Card } from 'antd';
import validateMessages from '@wetrial/core/validation';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

const Layout: React.FC = ({ children }) => {
  return (
    <ConfigProvider locale={zh_CN} form={{ validateMessages }}>
      <Card size="small">{children}</Card>
    </ConfigProvider>
  );
};

export default Layout;
