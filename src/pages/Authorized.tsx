import React from 'react';
import {Redirect} from 'umi';
import { stringify } from 'qs';
import router from 'umi/router';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import {getToken} from '@/wetrial/store'

function AuthComponent({ children, location, routerData }) {
  const isLogin = !!getToken();
  if(!isLogin){
    router.push({
      pathname: '/user/login',
      search: stringify({
        redirect: window.location.href,
      }),
    })
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
      noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
}
export default connect(({ menu }) => ({
  routerData: menu.routerData
}))(AuthComponent);
