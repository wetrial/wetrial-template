import React from 'react';
import { Link, history } from 'umi';
import { stringify } from 'qs';
import { ILayoutRuntimeConfig } from '@umijs/plugin-layout';
import { BasicLayoutProps } from '@ant-design/pro-layout';
import { ConfigProvider, message } from 'antd';
import validateMessages from '@wetrial/core/es/validation';
import { UseAPIProvider } from '@umijs/use-request';
// import { omit } from 'lodash';
// import { UnAuthorizedException } from '@wetrial/core/es/exception';
import { initHooks } from '@wetrial/hooks';
import { initComponent } from '@wetrial/component';
import defaultSettings from '@config/defaultSettings';
import { getCurrentUser } from '@/services/account';
import { getToken, clearToken } from '@/utils/authority';
import logo from './assets/logo.png';

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
  const token = getToken();
  const {
    // @ts-ignore
    location: { pathname },
  } = history;
  const loginPathName = '/account/login';
  // 未登录的情况
  if (!token) {
    if (pathname !== loginPathName) {
      // @ts-ignore
      history.push({
        pathname: loginPathName,
        query: {
          redirect: pathname,
        },
      });
    }
    return {};
  } else {
    return await getCurrentUser();
  }
}

// export const dva = {
//   config: {
//     onError(err) {
//       // if (err instanceof UnAuthorizedException) {
//       //   const unAuthorizedErr = err as UnAuthorizedException;
//       //   notification.info({
//       //     message: unAuthorizedErr.message,
//       //   });

//       //   // eslint-disable-next-line no-console
//       //   console.log(unAuthorizedErr.message);
//       // } else {
//       //   // eslint-disable-next-line no-console
//       //   console.error(err);
//       // }
//       err.preventDefault();
//     },
//   },
// };

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
    // footerRender: () => <DefaultFooter links={[]} copyright="2020 湖南微试云技术团队" />,
  };
};
