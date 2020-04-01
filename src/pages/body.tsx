import React from 'react';
import { Card } from 'antd';

const Layout: React.FC = ({ children }) => {
  return <Card size="small">{children}</Card>;
};

export default Layout;
