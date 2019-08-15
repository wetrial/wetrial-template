import { MenuDataItem } from '@wetrial/types';

import React, { useEffect } from 'react';
import { stringify } from 'qs';
import pathToRegexp from 'path-to-regexp';
import memoizeOne from 'memoize-one';
import { isEqual, union } from 'lodash';
import { Redirect, router } from 'umi';
import { connect } from 'dva';
import { getToken } from '@/utils/store';
import { urlToList } from '@wetrial/utils';
import Authorized from '@/utils/Authorized';

// 将menu转换成 列表
const menuToList = memoizeOne((menus: MenuDataItem[]): string[] => {
  let urls = [];
  menus.forEach(item => {
    if (item.path) {
      urls.push(item.path);
    }
    if (Array.isArray(item.routes)) {
      urls = urls.concat(menuToList(item.routes));
    }
  });
  return urls;
}, isEqual);

/**
 * 根据路由 匹配菜单中有权限的第一条
 * @description 如果有同级的菜单则使用第一个有权限的同级
 * @param pathname 当前的路由
 * @param menuData 当前有权限的路由列表
 */
const getDefaultRedirect = (pathname: string, menuData: MenuDataItem[]) => {
  if (pathname === '/') {
    return pathname;
  }
  const urlList = [''].concat(urlToList(pathname));
  const menus: string[] = union(menuToList(menuData).filter(m => m !== pathname));
  let redirect = '/exception/403';
  for (let i = urlList.length - 2; i >= 0; i--) {
    const urlReg = `^${urlList[i]}/`;
    // 查找第一个该路由的兄弟节点
    const browserMenu = menus.find(m => {
      return m.match(new RegExp(urlReg, 'i'));
    });
    if (browserMenu) {
      redirect = browserMenu;
      break;
    }
  }
  return redirect;
};

interface DefaultRedirectProps {
  pathname: string;
  menuData: MenuDataItem[];
}

// class DefaultRedirect extends React.PureComponent<DefaultRedirectProps> {
//   componentDidMount() {
//     const { pathname, menuData } = this.props;
//     const redirect = getDefaultRedirect(pathname, menuData);
//     router.push({
//       pathname:redirect
//     });
//   }
//   render() {
//     return <></>;
//   }
// }

const DefaultRedirect: React.FC<DefaultRedirectProps> = props => {
  useEffect(() => {
    const { pathname, menuData } = props;
    const redirect = getDefaultRedirect(pathname, menuData);
    router.push({
      pathname: redirect,
    });
  }, []);

  return <>无权限，正在跳转...</>;
};

const getRouteAuthority = (path: string, routeData: MenuDataItem[]) => {
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
          <DefaultRedirect pathname={location.pathname} menuData={routes} />
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
