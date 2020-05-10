import React from 'react';
import { Link, history } from 'umi';
import { stringify } from 'qs';
import { ILayoutRuntimeConfig } from '@umijs/plugin-layout';
import BasicLayout, { BasicLayoutProps, DefaultFooter } from '@ant-design/pro-layout';
import { ConfigProvider, Layout, Card, Menu, message } from 'antd';
import validateMessages from '@wetrial/core/validation';
import { UseAPIProvider } from '@umijs/use-request';
// import { omit } from 'lodash';
// import { UnAuthorizedException } from '@wetrial/core/exception';
import { configUseFormTableFormatResult } from '@wetrial/hooks';
import { request } from '@/utils/request';
import { configIconUrl } from '@/components/IconFont';
import defaultSettings from '@config/defaultSettings';
import { getCurrentUser } from '@/services/account';
import { ICurrentUser } from '@/models/account';
import { getToken, clearToken } from '@/utils/authority';
import logo from './assets/logo.png';
import DrawerMenu from './components/DrawerMenu';
import SideMenu from '@/components/SideMenu';
// import 'dayjs/locale/zh-cn';

configIconUrl(defaultSettings.iconfontUrl);

configUseFormTableFormatResult((data) => {
  return {
    total: data.totalCount,
    list: data.items,
  };
});

export function render(oldRender) {
  oldRender();
}

// export function patchRoutes({ routes }) {}

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
    return (await getCurrentUser()) as ICurrentUser;
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

export const layout: ILayoutRuntimeConfig & BasicLayoutProps = {
  logout: () => {
    clearToken();
    const {
      location: { pathname },
    } = history;

    if (pathname !== '/account/login') {
      history.push({
        pathname: '/account/login',
        search: stringify({
          redirect: pathname,
        }),
      });
    }
  },
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
  logo,
  iconfontUrl: defaultSettings.iconfontUrl,
  collapsed: true,
  // siderWidth: 100,
  // hasSiderMenu: false,
  contentStyle: {
    padding: '10px 10px 0 10px',
    minHeight: 'calc(100vh)', // 'calc(100vh - 84px)',
    background: '#fff',
    border: '5px solid rgb(240, 242, 245)',
  },
  menuRender: (props, defaultDom) => {
    debugger;
    // return <DrawerMenu prop={props} />;
    return <SideMenu {...props} />;
  },
  menuHeaderRender: (logoDom, titleDom) => {
    debugger;
    return (
      <Link to="/">
        {logoDom}
        {titleDom}
      </Link>
    );
  },
  menuItemRender: (menuItemProps, defaultDom) => {
    debugger;
    if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
      return defaultDom;
    }

    return (
      <Link to={menuItemProps.path}>
        <div className="jui-menu-icon">{menuItemProps.icon}</div>
        <div className="jui-menu-text">{menuItemProps.name}</div>
      </Link>
    );
    // return <Link to={menuItemProps.path}><div className='jui-menu-item'>{defaultDom}</div></Link>;
  },
  subMenuItemRender: (menuItemProps, defaultDom) => {
    debugger;
    if (menuItemProps.children || !menuItemProps.path) {
      return (
        <Link to={menuItemProps.children[0].path}>
          <div className="jui-menu-icon">{menuItemProps.icon}</div>
          <div className="jui-menu-text">{menuItemProps.name}</div>
        </Link>
      );
    } else {
      return defaultDom;
    }
  },
  itemRender: (route, params, routes, paths) => {
    const first = routes.indexOf(route) === 0;
    return first ? (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );
  },
  breadcrumbRender: (routers = []) => [
    {
      path: '/',
      breadcrumbName: '首页',
    },
    ...routers,
  ],
  // menuProps: {
  //   // triggerSubMenuAction: 'click',
  //   // getPopupContainer: ((triggerNode: HTMLElement) => triggerNode.parentNode),
  //   mode: 'vertical',
  // },
  // footerRender: () => <DefaultFooter links={[]} copyright="2020 湖南微试云技术团队" />,
  // rightContentRender: RightContent,
};
