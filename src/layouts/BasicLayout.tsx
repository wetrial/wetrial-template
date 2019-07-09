import React, { useEffect } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import {NormalLayout} from 'wetrial';
import {BasicLayoutProps as NormalLayoutProps} from '@wetrial/components/NormalLayout';
import { MenuDataItem,Dispatch } from '@wetrial/types';
import {Settings} from '@wetrial/defaultSettings';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';

import smallLog from '@/assets/imgs/wetrial-logo-small.jpg';

export interface BasicLayoutProps extends NormalLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: Settings;
  dispatch: Dispatch;
  user:object
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const footerRender: BasicLayoutProps['footerRender'] = (_, defaultDom) => {
  return defaultDom;
};


const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, settings } = props;
  
   /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/getCurrent',
      });
    }
  }, []);
  
  const handleMenuCollapse = (payload: boolean): void =>{
    if(dispatch){
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      })
    }
  }
console.log(props.user)
  return (
    <>
      <NormalLayout
        logo={smallLog}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: 'Home',
            }),
          },
          ...routers,
        ]}
        footerRender={footerRender}
        menuDataRender={menuDataRender}
        // formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
        {...settings}
      >
        {/* <PageHeaderWrapper>{props.children}</PageHeaderWrapper> */}
        {children}
      </NormalLayout>
    </>
  );
};

export default connect(({ global, settings,user }) => ({
  collapsed: global.collapsed,
  settings,
  user
}))(BasicLayout);
