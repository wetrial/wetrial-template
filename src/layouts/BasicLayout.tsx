import React, { useEffect } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import {NormalLayout} from 'wetrial';
import {BasicLayoutProps as NormalLayoutProps} from 'wetrial/components/NormalLayout';
import { IMenuDataItem,TDispatch } from 'wetrial/types';
import {ISettings} from 'wetrial/defaultSettings';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';

import smallLog from '@/assets/imgs/wetrial-logo-small.jpg';



export interface BasicLayoutProps extends NormalLayoutProps {
  breadcrumbNameMap: {
    [path: string]: IMenuDataItem;
  };
  settings: ISettings;
  dispatch: TDispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: IMenuDataItem;
  };
};

/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: IMenuDataItem[]): IMenuDataItem[] =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null) as IMenuDataItem;
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
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);
  
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });


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
        formatMessage={formatMessage}
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

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
