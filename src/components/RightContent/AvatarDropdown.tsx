import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { useModel, useHistory } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from './HeaderDropdown';
import { clearToken } from '@/utils/authority';

import styles from './index.less';

export interface GlobalHeaderRightProps {
  menu?: boolean;
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const history = useHistory();

  const loginOut = async () => {
    clearToken();
    if (history.location.pathname !== '/account/login') {
      history.replace({
        pathname: '/account/login',
        search: stringify({
          redirect: history.location.pathname,
        }),
      });
    }
  };

  const onMenuClick = useCallback((event) => {
    const { key } = event;
    if (key === 'logout') {
      setInitialState({ ...initialState, currentUser: undefined });
      loginOut();
      return;
    }
    history.push(`/account/${key}`);
  }, []);

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          className={styles.avatar}
          src={currentUser.avatar}
          icon={currentUser.avatar ? null : <UserOutlined />}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
