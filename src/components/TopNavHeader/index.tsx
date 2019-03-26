import React, { PureComponent } from 'react';

import H from 'history';
import { MenuMode,MenuTheme } from 'antd/es/menu';
import { CollapseType } from 'antd/es/layout/Sider';

import Link from 'umi/link';
import RightContent from '../GlobalHeader/RightContent';
import BaseMenu from '../SiderMenu/BaseMenu';
import { getFlatMenuKeys } from '../SiderMenu/utils';
import defaultSettings from '@/defaultSettings';
import styles from './index.less';

interface ITopNavHeaderProps {
  openKeys?: string[];
  theme?: MenuTheme;
  mode?: MenuMode;
  flatMenuKeys?: any[];
  location: H.Location;
  style?: React.CSSProperties;
  menuData: any[];
  isMobile: boolean;
  onCollapse: (collapsed: boolean, type?: CollapseType) => void;
  onOpenChange?: (openKeys: string[]) => void;

  onNoticeClear?:(type:any)=>void;
  onMenuClick:({key})=>void;
  onNoticeVisibleChange:(visible:boolean)=>void;

  logo:any;
  contentWidth?:string;
  collapsed:boolean;
}

interface IState {
  readonly maxWidth: number;
}

export default class TopNavHeader extends PureComponent<ITopNavHeaderProps,IState> {
  static getDerivedStateFromProps(props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40
    };
  }

  state:IState = {
    maxWidth: undefined,
  };

  render() {
    const { theme, contentWidth, menuData, logo,location,isMobile,openKeys,mode,collapsed } = this.props;
    const { maxWidth } = this.state;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return (
      <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
        <div 
          className={`${styles.main} ${contentWidth === 'Fixed' ? styles.wide : ''}`}
        >
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
                <h1>{defaultSettings.title}</h1>
              </Link>
            </div>
            <div
              style={{
                maxWidth,
              }}
            >
              <BaseMenu
                collapsed={collapsed}
                openKeys={openKeys} 
                theme={theme} 
                mode={mode}
                flatMenuKeys={flatMenuKeys} 
                location={location}
                menuData={menuData}
                isMobile={isMobile}
                onCollapse={()=>{return ;}}
                className={styles.menu} 
              />
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}
