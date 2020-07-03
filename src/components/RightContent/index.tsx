import React from 'react';
import { Space } from 'antd';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import { Settings as ProSettings } from '@ant-design/pro-layout';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState) {
    return null;
  }

  const { navTheme, layout } = initialState.settings as ProSettings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}`;
  }
  return (
    <Space className={className}>
      <Avatar />
    </Space>
  );
};

export default GlobalHeaderRight;
