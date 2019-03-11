import React, { PureComponent } from 'react';
import { Layout, Icon } from 'antd';
import { withRouter } from 'umi';
import { connect } from 'dva';
import { isEmpty } from 'lodash';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { getMenus } from '@/wetrial';
import { GlobalFooter } from '@/wetrial';
import { SideMenu } from '@/wetrial';
import { PageLoading } from '@/wetrial';
import styles from './BasicLayout.less';

const { Header, Content } = Layout;

@withRouter
@connect(({ global: { menus, userInfo, permissions } }) => ({
  menus,
  userInfo,
  permissions,
}))
class BasicLayout extends PureComponent {
  state = {
    collapsed: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchCurrent',
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, location, menus, userInfo, permissions } = this.props;
    if (isEmpty(menus) || isEmpty(userInfo) || isEmpty(permissions)) {
      return <PageLoading fullScreen={true} />;
    }
    const menuData = getMenus(menus, permissions);
    return (
      <Layout className={styles['wt-layout']}>
        <SideMenu onCollapse={() => {}} menuData={menuData} />
        <Layout>
          <Header style={{ padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <TransitionGroup>
                <CSSTransition
                  key={location.pathname}
                  classNames="page-slider"
                  timeout={300}
                  appear={true}
                  unmountOnExit={true}
                >
                  <div>{children}</div>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </Content>
          <GlobalFooter style={{ textAlign: 'center' }} copyright="XXG-UMI-TEMPLATE ©2018" />
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
