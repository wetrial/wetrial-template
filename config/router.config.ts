import { IRoute } from 'umi-types';
import Permissions from './permissions';

const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      // user
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
          {
            path: '/example',
            name: '例子',
            authority: Permissions.example.base,
            icon: 'smile',
            routes: [
              { path: '/example', redirect: '/example/permission' },
              {
                path: '/example/permission',
                name: '权限',
                authority: Permissions.example.permission,
                component: './Example/Permission/index',
              },
              {
                path: '/example/drag',
                name: '拖拽',
                authority: Permissions.example.reactDnd,
                component: './Example/Drag-Drop/index',
              },
              {
                path: '/example/test',
                name: '测试页面',
                authority: Permissions.example.reactDnd,
                component: './Example/Test/index',
              },
              {
                path: '/example/list',
                name: '列表',
                exact: true,
                authority: Permissions.example.list,
                component: './Example/List/index',
              },
              {
                path: '/example/list/:id?',
                hideInMenu: true,
                authority: Permissions.example.list,
                component: './Example/List/edit',
              },
            ],
          },
          {
            name: '异常',
            icon: 'warning',
            path: '/exception',
            routes: [
              // exception
              {
                path: '/exception/403',
                name: '无权限',
                component: './Exception/403',
              },
              {
                path: '/exception/404',
                name: '404',
                component: './Exception/404',
              },
              {
                path: '/exception/500',
                name: '500',
                component: './Exception/500',
              },
              {
                path: '/exception/trigger',
                name: 'trigger',
                hideInMenu: true,
                component: './Exception/TriggerException',
              },
            ],
          },
          {
            component: '404',
          },
        ],
      },
    ],
  },
];

export default routes;
