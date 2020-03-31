import React from 'react';
import { ConfigProvider, Card } from 'antd';
import validateMessages from '@wetrial/core/validation';

const Layout: React.FC = ({ children }) => {
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Card size="small">{children}</Card>
    </ConfigProvider>
  );
};

export default Layout;
