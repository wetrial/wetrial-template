import React from 'react';
import { Link } from 'umi';
// import { stringify } from 'qs';
import { ILayoutRuntimeConfig } from '@umijs/plugin-layout';
import { BasicLayoutProps } from '@ant-design/pro-layout';
import { ConfigProvider, message } from 'antd';
import validateMessages from '@wetrial/core/lib/validation';
import { UseAPIProvider } from '@umijs/use-request';
import { initHooks } from '@wetrial/hooks';
import { initComponent } from '@wetrial/component';
import defaultSettings from '../config/defaultSettings';
// import { getCurrentUser } from '@/services/account';
// import { ICurrentUser } from '@/models/account';
// import { getToken, clearToken } from '@/utils/authority';

(function initConfig() {
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
          // requestMethod: (param) => request(param),
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

export const layout: ILayoutRuntimeConfig & BasicLayoutProps = {
  navTheme: 'light',
  errorBoundary: {
    /** 发生错误后的回调（可做一些错误日志上报，打点等） */
    onError: (error, info) => {
      console.error(error, info);
    },
    /** 发生错误后展示的组件，接受 error */
    ErrorComponent: (error) => {
      return <div>{error}</div>;
    },
  },
  logo: `${window['publicPath']}logo.png`,
  iconfontUrl: defaultSettings.iconfontUrl,
  menuHeaderRender: (logoDom, titleDom) => {
    return (
      <Link to="/">
        {logoDom}
        {titleDom}
      </Link>
    );
  },
  // siderWidth: 200,
  contentStyle: {
    padding: '10px 10px 0 10px',
    minHeight: 'calc(100vh)', // 'calc(100vh - 84px)',
    background: '#fff',
    border: '5px solid rgb(240, 242, 245)',
  },
  menuItemRender: (menuItemProps, defaultDom) => {
    if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
      return defaultDom;
    }
    return <Link to={menuItemProps.path}>{defaultDom}</Link>;
  },
  breadcrumbRender: (routers = []) => [
    {
      path: '/',
      breadcrumbName: '首页',
    },
    ...routers,
  ],
  itemRender: (route, params, routes, paths) => {
    const first = routes.indexOf(route) === 0;
    return first ? (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );
  },
  // logout: () => {
  //   clearToken();
  //   const {
  //     location: { pathname },
  //   } = history;

  //   if (pathname !== '/account/login') {
  //     history.push({
  //       pathname: '/account/login',
  //       search: stringify({
  //         redirect: pathname,
  //       }),
  //     });
  //   }
  // },
  // footerRender: () => <DefaultFooter links={[]} copyright="2020 湖南微试云技术团队" />,
  // rightContentRender: RightContent,
};
