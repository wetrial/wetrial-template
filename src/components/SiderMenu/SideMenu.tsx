import React from 'react';
import { Link } from 'umi';
import { Layout } from 'antd';
import classNames from 'classnames';
import { BaseMenuProps } from './BaseMenu';
import { PageLoading } from '@/wetrial';
import { getDefaultCollapsedSubMenus } from './utils';
import styles from './index.less';

const { Sider } = Layout;
const BaseMenu = React.lazy(() => import('./BaseMenu'));

let firstMount = true;

export interface SideMenuProps extends BaseMenuProps {
  logo: any;
  title?: string;
  collapsed: boolean;
  fixSiderBar?: boolean;
}

interface State {
  readonly openKeys: string[];
}

class SideMenu extends React.Component<SideMenuProps, State> {
  static getDerivedStateFromProps(props, state) {
    const { pathname, flatMenuKeysLen } = state;
    if (props.location.pathname !== pathname || props.flatMenuKeys.length !== flatMenuKeysLen) {
      return {
        pathname: props.location.pathname,
        flatMenuKeysLen: props.flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

  readonly state: State = {
    openKeys: getDefaultCollapsedSubMenus(this.props)
  };

  componentDidMount() {
    firstMount = false;
  }

  isMainMenu = (key) => {
    const { menuData } = this.props;
    return menuData.some((item) => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  render() {
    const { theme, collapsed, onCollapse, fixSiderBar, logo, title,isMobile } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };
    
    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderBar]: fixSiderBar,
      [styles.light]: theme === 'light',
    });

    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            onCollapse(collapse);
          }
        }}
        width={256}
        theme={theme}
        className={siderClassName}
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
            handleOpenChange={this.handleOpenChange}
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
