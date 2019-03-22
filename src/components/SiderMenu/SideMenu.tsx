import React from 'react';
import {Link} from 'umi';
import { Layout } from 'antd';
import ClassNames from 'classnames';
import BaseMenu, { BaseMenuProps } from './BaseMenu';
import {PageLoading} from '@/wetrial';
import { getDefaultCollapsedSubMenus } from './utils';
import styles from './index.less';

const { Sider } = Layout;

export interface SideMenuProps extends BaseMenuProps {
  logo: any;
  title?:string;
  collapsed?: boolean;
  fixSideBar?: boolean;
}

interface State {
  readonly openKeys: string[];
}

class SideMenu extends React.PureComponent<SideMenuProps, State> {
  readonly state: State = {
    openKeys: getDefaultCollapsedSubMenus(this.props)
  };

  //
  isMainMenu = (key) => {
    const { menuData } = this.props;
    return menuData.some((item) => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  // 菜单打开的回调
  handleOpenChange = (openKeys) => {
    const moreThanOne =
      openKeys.filter((openKey) => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
    });
  };

  render() {
    const { theme, collapsed, onCollapse, fixSideBar,logo,title } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint="lg"
        width={256}
        className={ClassNames(styles.sideMenu, {
          [styles.fixSideBar]: fixSideBar,
          [styles.light]: theme === 'light'
        })}
      >
       <div className={styles.logo} id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>{title}</h1>
          </Link>
        </div>
        <React.Suspense fallback={<PageLoading />}>
          <BaseMenu
            {...this.props}
            mode="inline"
            onOpenChange={this.handleOpenChange}
            style={{ padding: '16px 0', width: '100%' }}
            {...defaultProps}
          />
        </React.Suspense>
      </Sider>
    );
  }
}

export default SideMenu;
