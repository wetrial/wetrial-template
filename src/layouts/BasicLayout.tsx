import H from 'history';
import { Dispatch } from 'redux';
import { ISettingsModelState } from '@/types/settings';

import { Layout } from 'antd';
import React from 'react';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import { connect } from 'dva';
import classNames from 'classnames';
import Media from 'react-media';
import SiderMenu from '@/components/SiderMenu';
import Context from './MenuContext';
import Header from './Header';
import Footer from './Footer';
import getPageTitle from '@/utils/getPageTitle';
import styles from './BasicLayout.less';

import logo from '@/assets/imgs/wetrial-logo.jpg';
import smallLogo from '@/assets/imgs/wetrial-logo-small.jpg';

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
};

export interface BasicLayoutProps {
  // 通过umi注入 https://github.com/umijs/umi/blob/master/packages/umi/src/renderRoutes.js
  route: {
    routes: any[];
    path: string;
    component: React.ReactNode;
    authority: string | string[]
  };
  dispatch: Dispatch<any>;
  location: H.Location;
  setting: ISettingsModelState;
  collapsed: boolean;
  menuData: any[];
  breadcrumbNameMap: any[];
  isMobile: boolean;
}

class BasicLayout extends React.PureComponent<BasicLayoutProps, any> {
  readonly breadcrumbNameMap: object;

  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;

    dispatch({
      type: 'user/getCurrent',
    });

    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  // getLayoutStyle = () => {
  //   const {
  //     setting: {
  //       fixSiderbar,
  //       layout
  //     },
  //     isMobile,
  //     collapsed
  //   } = this.props;
  //   if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
  //     return {
  //       paddingLeft: collapsed ? '80px' : '256px',
  //     };
  //   }
  //   return null;
  // };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeCollapsed',
      payload: collapsed,
    });
  };

  render() {
    const {
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      setting:{fixedHeader,navTheme,layout:PropsLayout},
      collapsed
    } = this.props;

    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={collapsed?smallLogo:logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            isMobile={isMobile}
            logo={smallLogo}
            {...this.props}
          />
          <Content className={styles.content} style={contentStyle}>
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu }) => ({
  collapsed: global.collapsed,
  menuData: menu.menuData,
  breadcrumbNameMap: menu.breadcrumbNameMap,
  setting
}))((props) => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
