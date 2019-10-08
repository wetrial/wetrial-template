import { IRoute } from 'umi-types';
import example from './routes/example';
import exception from './routes/exception';

const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/user',
            redirect: '/user/login',
          },
          {
            name: '登录',
            path: '/user/login',
            component: './User/Login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        routes: [
          {
            path: '/',
            redirect: '/example',
          },
          example,
          exception,
          {
            component: '403',
          },
        ],
      },
    ],
  },
];

export default routes;
