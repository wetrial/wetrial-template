import { IRoute } from 'umi-types';
import { TemplateRoutes } from './modules/template';

const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BaseLayout',
    routes: [
      // {
      //   path: '/user',
      //   component: '../layouts/UserLayout',
      //   routes: [
      //     {
      //       path: '/user',
      //       redirect: '/user/login',
      //     },
      //     {
      //       name: '登录',
      //       path: '/user/login',
      //       component: './User/Login',
      //     },
      //   ],
      // },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        // Routes: ['src/pages/Authorized'],
        routes: [
          {
            path: '/',
            redirect: '/template',
          },
          ...TemplateRoutes,
          {
            name: '异常',
            icon: 'warning',
            hideInMenu: true,
            path: '/exception',
            routes: [
              // exception
              {
                path: '/exception/403',
                name: '无权限',
                component: './exception/403',
              },
              {
                path: '/exception/404',
                name: '404',
                component: './exception/404',
              },
              {
                path: '/exception/500',
                name: '500',
                component: './exception/500',
              },
            ],
          },
          {
            component: '403',
          },
        ],
      },
    ],
  },
];

export default routes;
