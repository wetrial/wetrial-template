import React from 'react';
import { Link } from 'umi';
import { BasicLayoutProps } from '@ant-design/pro-layout';
import { ConfigProvider, message } from 'antd';
import validateMessages from '@wetrial/core/es/validation';
import { UseAPIProvider } from '@umijs/use-request';
import { initHooks } from '@wetrial/hooks';
import { initComponent } from '@wetrial/component';
import { request } from '@/utils/request';
import defaultSettings from '../config/defaultSettings';
import logo from '@/assets/logo.png';

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

export async function getInitialState() {
  // const token = getToken();
  // const {
  //   // @ts-ignore
  //   location: { pathname },
  // } = history;
  // const loginPathName = '/account/login';
  // // 未登录的情况
  // if (!token) {
  //   if (pathname !== loginPathName) {
  //     // @ts-ignore
  //     history.push({
  //       pathname: loginPathName,
  //       query: {
  //         redirect: pathname,
  //       },
  //     });
  //   }
  //   return {};
  // } else {
  //   return (await getCurrentUser()) as ICurrentUser;
  // }
  return {};
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

export const layout = (): BasicLayoutProps => {
  return {
    navTheme: 'light',
    logo,
    iconfontUrl: defaultSettings.iconfontUrl,
    menuHeaderRender: (logoDom, titleDom) => {
      return (
        <Link to="/">
          {logoDom}
          {titleDom}
        </Link>
      );
    },
    // rightContentRender: RightContent,
    menuItemRender: (menuItemProps, defaultDom) => {
      if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
        return defaultDom;
      }

      return <Link to={menuItemProps.path}>{defaultDom}</Link>;
    },
    // footerRender: () => <DefaultFooter links={[]} copyright="2020 湖南微试云技术团队" />,
  };
};
