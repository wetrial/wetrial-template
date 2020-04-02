import { IBestAFSRoute } from '@umijs/plugin-layout';
import BlogRoutes from '../src/modules/blogs';

/**
 * 权限定义
 */
const Permissions = {
  template: {
    dashboard: {
      index: 'template.dashboard',
    },
    sample: {
      index: 'template.sample',
      list: {
        index: 'template.sample.list',
        edit: 'template.sample.list.edit',
        delete: 'template.sample.list.delete',
      },
    },
  },
};

/**
 * 路由定义
 */
const TemplateRoutes: IBestAFSRoute[] = [
  {
    path: '/template',
    menu: {
      name: '欢迎', // 兼容此写法
      // hideChildren:false,
      flatMenu: true,
    },
    routes: [
      {
        path: '/template',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        name: '看板',
        icon: 'dashboard',
        access: Permissions.template.dashboard.index,
        component: '@/pages/template/dashboard/index',
      },
      {
        path: 'sample',
        name: '案例',
        access: Permissions.template.sample.index,
        icon: 'smile',
        routes: [
          {
            path: '/template/sample',
            redirect: 'list',
          },
          {
            path: 'list',
            name: '列表',
            access: Permissions.template.sample.list.index,
            component: '@/pages/template/sample/list/index',
            exact: true,
          },
          {
            path: 'list/edit/:id?',
            component: '@/pages/template/sample/list/edit',
            access: Permissions.template.sample.list.edit,
            exact: true,
          },
        ],
      },
    ],
  },
];

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
      ...BlogRoutes,
    ],
  },
];

export default routes;
export { Permissions, TemplateRoutes };
