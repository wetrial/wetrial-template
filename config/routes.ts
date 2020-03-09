import moduleRoutes from './modules';

// umi routes: https://umijs.org/zh/guide/router.html
export default [
  {
    path: '/account',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/account/login',
        component: './Account/Login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/template',
          },
          ...moduleRoutes,
        ],
      },
      {
        component: './Exception/404',
      },
    ],
  },
  {
    component: './Exception/404',
  },
];
