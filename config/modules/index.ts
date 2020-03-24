import { IBestAFSRoute } from '@umijs/plugin-layout';
import { TemplateRoutes } from './template';

// umi routes: https://umijs.org/zh/guide/router.html
const routes: IBestAFSRoute[] = [
  {
    path: '/',
    menu: {
      name: '欢迎',
      flatMenu: true,
    },
    component: '@/pages/body',
    routes: [
      {
        path: '/account',
        component: '@/layouts/UserLayout',
        layout: {
          hideNav: true,
          hideMenu: true,
        },
        routes: [
          {
            name: '登录',
            path: 'login',
            component: '@/pages/account/login/index',
          },
        ],
      },
      ...TemplateRoutes,
    ],
  },
];
export default routes;
