import { IMenuDataItem } from '@wetrial/types';

import React, { useEffect } from 'react';
import { stringify } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { Redirect, router } from 'umi';
import { connect } from 'dva';
import { Spin } from 'antd';
import { getToken } from '@/utils/store';
import Authorized from '@/utils/Authorized';

// // 将menu转换成 列表
// const menuToList = memoizeOne((menus: IMenuDataItem[]): string[] => {
//   let urls = [];
//   menus.forEach(item => {
//     if (item.path) {
//       urls.push(item.path);
//     }
//     if (Array.isArray(item.routes)) {
//       urls = urls.concat(menuToList(item.routes));
//     }
//   });
//   return urls;
// }, isEqual);
interface DefaultRedirectProps {
  pathname: string;
}

const DefaultRedirect: React.FC<DefaultRedirectProps> = props => {
  useEffect(() => {
    router.push({
      pathname: '/403',
      query: {
        redirect: props.pathname,
      },
    });
  }, []);

  return <Spin className="full" spinning size="large" />;
};

// const DefaultRedirect: React.FC<DefaultRedirectProps> = props => {
//   useEffect(() => {
//     const { pathname, menuData } = props;
//     const redirect = getDefaultRedirect(pathname, menuData);
//     router.push({
//       pathname: redirect,
//     });
//   }, []);

//   return <>无权限，正在跳转...</>;
// };

const getRouteAuthority = (path: string, routeData: IMenuDataItem[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach(route => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

function AuthComponent({ children, location = { pathname: '' }, route = { routes: [] } }) {
  const { routes = [] } = route;
  const isLogin = !!getToken();
  if (!isLogin) {
    router.push({
      pathname: '/user/login',
      search: stringify({
        redirect: window.location.href,
      }),
    });
    return null;
  }

  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes)}
      noMatch={
        isLogin ? (
          <DefaultRedirect pathname={location.pathname} />
        ) : (
          <Redirect to={`/user/login?redirect=${window.location.href}`} />
        )
      }
    >
      {children}
    </Authorized>
  );
}
export default connect(({ user }) => ({
  user,
}))(AuthComponent);
