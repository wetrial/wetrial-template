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
      authority:Permissions.app,
      routes: [
        // dashboard
        { path: '/', redirect: '/dashboard/analysis' },
        {
          path: '/dashboard',
          name: 'dashboard',
          icon: 'dashboard',
          routes: [
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              component: './Dashboard/Analysis'
            },
            {
              path: '/dashboard/monitor',
              name: 'monitor',
              component: './Dashboard/Monitor'
            },
            {
              path: '/dashboard/workplace',
              name: 'workplace',
              component: './Dashboard/Workplace'
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
        },
        // 系统管理模块
        {
          name: 'system',
          icon: 'desktop',
          path: '/system',
          routes: [
            {
              path: '/system/user',
              name: 'user',
              component: '../layouts/BlankLayout',
              routes: [
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
        }
      ]
    }
  ];
  
export default routes;