import React from 'react';
import { stringify } from 'qs';
import pathToRegexp from 'path-to-regexp';
import memoizeOne from 'memoize-one';
import { isEqual } from 'lodash';
import { Redirect, router } from 'umi';
import { connect } from 'dva';
import { getToken } from '@/utils/store';
import { urlToList } from '@wetrial/utils';
import Authorized from '@/utils/Authorized';

// 将menu转换成 列表
const menuToList = memoizeOne((menus: any[]) => {
  let urls = [];
  menus.forEach(item => {
    urls.push(item.path);
    if (Array.isArray(item.children)) {
      urls = urls.concat(menuToList(item.children));
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
const getDefaultRedirect = (pathname: string, menuData: any[]) => {
  if (pathname === '/') {
    return pathname;
  }
  const urlList = [''].concat(urlToList(pathname));
  const menus: any[] = menuToList(menuData);
  let redirect = '/exception/403';
  for (let i = urlList.length - 2; i >= 0; i--) {
    const urlReg = `^${urlList[i]}/`;
    // 查找第一个该路由的兄弟节点
    const browserMenu = menus.find(m => m.match(new RegExp(urlReg, 'i')));
    if (browserMenu) {
      redirect = browserMenu;
      break;
    }
  }
  return redirect;
};

interface DefaultRedirectProps {
  pathname: string;
  menuData: any[];
}

class DefaultRedirect extends React.PureComponent<DefaultRedirectProps> {
  componentDidMount() {
    const { pathname, menuData } = this.props;
    const redirect = getDefaultRedirect(pathname, menuData);
    router.push(redirect);
  }

  render() {
    return <></>;
  }
}

function AuthComponent({ children, location, routerData, menuData }) {
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
  const getRouteAuthority = (path, routeData) => {
    let authorities;
    routeData.forEach(route => {
      // match prefix
      if (pathToRegexp(`${route.path}(.*)`).test(path)) {
        authorities = route.authority || authorities;

        // get children authority recursively
        if (route.routes) {
          authorities = getRouteAuthority(path, route.routes) || authorities;
        }
      }
    });
    return authorities;
  };
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routerData)}
      noMatch={
        isLogin ? (
          <DefaultRedirect pathname={location.pathname} menuData={menuData} />
        ) : (
          <Redirect to={`/user/login?redirect=${window.location.href}`} />
        )
      }
    >
      {children}
    </Authorized>
  );
}
export default connect(({ menu }) => ({
  routerData: menu.routerData,
  menuData: menu.menuData,
}))(AuthComponent);
