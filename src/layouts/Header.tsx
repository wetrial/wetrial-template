import { PureComponent } from '@/wetrial';
import { ISettingsModelState } from '@/types/settings';
import H from 'history';

import React from 'react';
import { Layout, message } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'dva';
import GlobalHeader from '@/components/GlobalHeader';
import TopNavHeader from '@/components/TopNavHeader';

import styles from './Header.less';

const { Header } = Layout;

export interface HeaderProps {
  isMobile: boolean;
  collapsed: boolean;
  handleMenuCollapse?: (collapsed: boolean) => any;
  fetchTips?: boolean;
  currentUser?: any;
  setting: ISettingsModelState;
  tips?:any;
  location: H.Location;
  menuData: any[];
  logo: any,
}

@connect(({ global, loading, user }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  tips: global.tips,
  fetchTips: loading.effects['global/getAll']
}))
class HeaderView extends PureComponent<HeaderProps, any> {
  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  } 
  state = {
    visible: true,
  };
  
  private ticking:any;
  private oldScrollTop:any;

  componentDidMount() {
    const {dispatch}=this.props;
    dispatch({
      type:'global/getAll',
      payload:{
        force:true
      }
    })
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  handleNoticeClear = type => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/setAllToRead',
      payload: type,
    });
    message.info(`点击了清空-${type}`);
  };

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
      });
    }
  };

  handleNoticeItemClick=(item,tabProps)=>{
    const {title}=tabProps;
    const {title:noticeTitle}=item;
    message.info(`点击了${title}-${noticeTitle}`);
  }

  handleNoticeViewMore=(tabProps,e)=>{
    console.log(tabProps,e);
    message.info('点击了查看更多');
  }

  handleNoticeTabChange=(tabTitle)=>{
    console.log(tabTitle);
    message.info('切换了tab');
  }

  handleNoticeVisibleChange = visible => {
    if (visible) {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/getAll'
      });
    }
  };

  handScroll = () => {
    const { 
      setting:{
        autoHideHeader
      } 
    } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
        } else if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        } else if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
  };

  render() {
    const { isMobile,collapsed, handleMenuCollapse, setting,location,tips:{count,todos,notifys,messages},fetchTips,logo,currentUser,menuData } = this.props;
    const { navTheme, layout, fixedHeader } = setting;
    const { visible } = this.state;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();
    const HeaderDom = visible ? (
      <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
        {isTop && !isMobile ? (
          <TopNavHeader
            menuData={menuData}
            isMobile={isMobile}
            logo={logo}
            collapsed={collapsed}
            theme={navTheme}
            mode="horizontal"
            onCollapse={handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            location={location}
            noticeIcon={{
              loading:fetchTips,
              count,
              todos,
              notifys,
              messages,
              onClear:this.handleNoticeClear,
              onPopupVisibleChange:this.handleNoticeVisibleChange,
              onItemClick:this.handleNoticeItemClick,
              onViewMore:this.handleNoticeViewMore,
              onTabChange:this.handleNoticeTabChange
            }}
          />
        ) : (
            <GlobalHeader
              logo={logo}
              collapsed={collapsed}
              onCollapse={handleMenuCollapse}
              isMobile={isMobile}
              currentUser={currentUser}
              onMenuClick={this.handleMenuClick}
              noticeIcon={{
                loading:fetchTips,
                count,
                todos,
                notifys,
                messages,
                onClear:this.handleNoticeClear,
                onPopupVisibleChange:this.handleNoticeVisibleChange,
                onItemClick:this.handleNoticeItemClick,
                onViewMore:this.handleNoticeViewMore,
                onTabChange:this.handleNoticeTabChange
              }}
            />
          )}
      </Header>
    ) : null;
    return (
      <Animate transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default HeaderView;
