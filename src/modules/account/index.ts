import { IBestAFSRoute } from '@umijs/plugin-layout';

const ROUTE_BASE = '@/modules/account/';

const Permissions = {};

/**
 * 路由定义
 */
const Routes: IBestAFSRoute[] = [
  {
    path: '/account',
    layout: {
      hideNav: true,
      hideMenu: true,
    },
    routes: [
      {
        path: '/account',
        redirect: 'login',
      },
      {
        path: 'login',
        name: '登录',
        component: `${ROUTE_BASE}login/index`,
      },
    ],
  },
];

export default Routes;
export { Permissions };
