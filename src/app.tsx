import React from 'react';
import { history, Link } from 'umi';
import { BasicLayoutProps, MenuDataItem } from '@ant-design/pro-layout';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { ConfigProvider, Avatar, message } from 'antd';
import validateMessages from '@wetrial/core/es/validation';
import { UseAPIProvider } from '@umijs/use-request';
// import { UnAuthorizedException } from '@wetrial/core/es/exception';
import { initHooks } from '@wetrial/hooks';
import { initComponent } from '@wetrial/component';
import defaultSettings from '@config/defaultSettings';
import { getCurrentUser } from '@/services/account';
import { request } from '@/utils/request';
import { getToken } from '@/utils/authority';
import { IGlobalProps } from '@/services/global.d';
import logo from './assets/logo.png';

import SideMenu from '@/components/SideMenu';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

(function init() {
  // 初始化组件配置信息
  initComponent({
    iconFontUrl: defaultSettings.iconfontUrl,
  });

  // 初始化hooks配置信息，根据需要
  initHooks({
    formTableResultFormat: (data) => {
      return {
        total: data.totalCount,
        list: data.items,
      };
    },
  });
})();

export function render(oldRender) {
  oldRender();
}

export async function getInitialState(): Promise<IGlobalProps> {
  const token = getToken();
  const {
    // @ts-ignore
    location: { pathname },
  } = history;
  const loginPathName = '/account/login';
  // 未登录的情况
  if (!token) {
    if (pathname !== loginPathName) {
      history.push({
        pathname: loginPathName,
        query: {
          redirect: pathname,
        },
      });
    }
    return {
      settings: defaultSettings,
    };
  } else {
    const currentUser = await getCurrentUser();
    return {
      currentUser,
      settings: defaultSettings,
    };
  }
}

export function rootContainer(container) {
  return React.createElement(
    ConfigProvider,
    {
      form: { validateMessages },
      locale: zhCN,
    },
    // container,
    React.createElement(
      UseAPIProvider,
      {
        value: {
          requestMethod: (param) => request(param),
          onError: (err) => {
            console.error(err);
            message.error(err.message);
            throw err;
          },
        },
      },
      container,
    ),
  );
}

export const layout = ({ initialState }: { initialState: IGlobalProps }): BasicLayoutProps => {
  const { currentUser } = initialState;
  return {
    navTheme: 'light',
    logo,
    iconfontUrl: defaultSettings.iconfontUrl,
    ...initialState?.settings,
    collapsed: false,
    siderWidth: 70,
    headerRender: false,
    disableMobile: true,
    menuHeaderRender: (headerLogo) => {
      // return <IconFont type="icon-wt-logo" style={{ fontSize: '24px', margin: 'auto' }} />;
      return headerLogo;
    },
    menuRender: (props: HeaderViewProps) => {
      return <SideMenu {...props} />;
    },
    menuItemRender: (item: MenuDataItem, defaultDom: React.ReactNode) => {
      if (item.parentKeys && item.parentKeys.length === 1 && item.children) {
        const firstChildrenPath = item.children[0].path || '/';
        return <Link to={firstChildrenPath}>{defaultDom}</Link>;
      }
      return defaultDom;
    },
    // postMenuData: (menus) => {
    //   return menus as MenuDataItem[];
    // },
    collapsedButtonRender: false,
    links: [
      <Avatar alt={currentUser?.name} src={currentUser?.avatar}>
        {currentUser?.name}
      </Avatar>,
    ],
  };
};
