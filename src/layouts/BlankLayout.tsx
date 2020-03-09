import React from 'react';
import { ConfigProvider } from 'antd';
import validateMessages from '@wetrial/core/validation';

const Layout: React.FC = ({ children }) => (
  <ConfigProvider form={{ validateMessages }}>{children}</ConfigProvider>
);

export default Layout;
