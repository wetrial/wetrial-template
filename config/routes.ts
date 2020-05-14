import { IBestAFSRoute } from '@umijs/plugin-layout';
// import AccountRoutes from '../src/modules/account';

/**
 * 权限定义
 */
const Permissions = {
  template: {
    dashboard: {
      index: '',
    },
    sample: {
      index: '',
      list: {
        index: '',
        edit: '',
        delete: '',
      },
    },
  },
};

/**
 * 路由定义
 */
const PageRoutes: IBestAFSRoute[] = [
  {
    path: '/template',
    menu: {
      name: 'Wetrial',
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
            path: 'list/simple-list',
            access: Permissions.template.sample.list.index,
            component: '@/pages/template/sample/list/simple-list',
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
    // component: '@/pages/body',
    routes: [
      {
        path: '/',
        redirect: '/template',
      },
      // ...AccountRoutes,
      ...PageRoutes,
    ],
  },
];

export default routes;
export { Permissions, PageRoutes };
