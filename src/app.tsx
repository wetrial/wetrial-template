import React from 'react';
import { history } from 'umi';
import { BasicLayoutProps } from '@ant-design/pro-layout';
import { ConfigProvider, Avatar, message } from 'antd';
import validateMessages from '@wetrial/core/es/validation';
import { UseAPIProvider } from '@umijs/use-request';
// import { UnAuthorizedException } from '@wetrial/core/es/exception';
import { initHooks } from '@wetrial/hooks';
import { initComponent, IconFont } from '@wetrial/component';
import defaultSettings from '@config/defaultSettings';
import { getCurrentUser } from '@/services/account';
import { request } from '@/utils/request';
import { getToken } from '@/utils/authority';
import { IGlobalProps } from '@/services/global.d';
import logo from './assets/logo.png';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import SideMenu from '@/components/SideMenu';

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
      console.log(props);
      return <SideMenu {...props} />;
    },
    // menuItemRender: () => null,
    // subMenuItemRender: (item: MenuDataItem) => {
    //   console.log(item);
    //   return (
    //     <li>
    //       {item.icon}
    //       {item.name}
    //     </li>
    //   );
    // },
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
