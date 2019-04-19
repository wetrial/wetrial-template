import {IRoute} from 'umi-types';
import Permissions from '../src/constants/permissions';

const routes:IRoute[]= [
    // user
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        { path: '/user', redirect: '/user/login' },
        { path: '/user/login', component: './User/Login' }
      ]
    },
    // app
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      routes: [
        { path: '/', redirect: '/example' },
        {
          path: '/example',
          name: 'example',
          authority:Permissions.example.base,
          icon: 'smile',
          routes: [
            { path: '/example', redirect: '/example/drag' },
            {
              path: '/example/permission',
              name: 'permission',
              authority:Permissions.example.permission,
              component: './Example/Permission/index'
            },
            {
              path: '/example/drag',
              name: 'drag-drop',
              authority:Permissions.example.reactDnd,
              component: './Example/Drag-Drop/index'
            }
          ]
        },
        // 系统管理模块
        {
          name: 'system',
          icon: 'desktop',
          path: '/system',
          routes: [
            { path: '/system', redirect: '/system/user' },
            {
              path: '/system/user',
              name: 'user',
              component: '../layouts/BlankLayout',
              routes: [
                { path: '/system/user', redirect: '/system/user/groups' },
                {
                  path: '/system/user/groups',
                  name: 'groups',
                  component: './system/user/groups'
                },
                {
                  path: '/system/user/users',
                  name: 'users',
                  component: './system/user/users'
                },
              ]
            },
            {
              path: '/system/permission',
              name: 'permission',
              component: '../layouts/BlankLayout',
              routes: [
                { path: '/system/permission', redirect: '/system/permission/permissions' },
                {
                  path: '/system/permission/permissions',
                  name: 'permissions',
                  component: './system/permission/permissions'
                },
                {
                  path: '/system/permission/policies',
                  name: 'policies',
                  component: './system/permission/policies',
                },
              ]
            }
          ]
        },
        {
          name: 'exception',
          icon: 'warning',
          path: '/exception',
          routes: [
            // exception
            {
              path: '/exception/403',
              name: 'not-permission',
              component: './Exception/403'
            },
            {
              path: '/exception/404',
              name: 'not-find',
              component: './Exception/404'
            },
            {
              path: '/exception/500',
              name: 'server-error',
              component: './Exception/500'
            },
            {
              path: '/exception/trigger',
              name: 'trigger',
              hideInMenu: true,
              component: './Exception/TriggerException'
            }
          ]
        }
      ]
    }
  ];
  
export default routes;