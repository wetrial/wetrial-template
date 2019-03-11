import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { Link } from 'umi';
import { getFlatMenuKeys, IMenuItemProps } from './utils';
import BaseMenu from './BaseMenu';
import styles from './index.less';

const { Sider } = Layout;

interface ISideMenuProps {
  menuData: IMenuItemProps[];
  collapsed?: boolean;
  onCollapse: () => void;
}

class SiderMenuWrapper extends PureComponent<ISideMenuProps> {
  handleOpenChange = () => {
    return;
  };

  render() {
    const { menuData, collapsed, onCollapse } = this.props;
    const openKeys = [];
    const defaultProps = collapsed ? {} : { openKeys };
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
      >
        <div className={styles.logo}>
          <Link to="/">
            <img src="" alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
        <BaseMenu
          {...this.props}
          data={flatMenuKeys}
          mode="inline"
          handleOpenChange={this.handleOpenChange}
          onOpenChange={this.handleOpenChange}
          style={{ padding: '16px 0', width: '100%' }}
          {...defaultProps}
        />
      </Sider>
    );
  }
}

export default SiderMenuWrapper;
