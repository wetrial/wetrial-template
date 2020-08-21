import { IBestAFSRoute } from '@umijs/plugin-layout';

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

// umi routes: https://umijs.org/zh/guide/router.html
const routes: IBestAFSRoute[] = [
  {
    path: '/',
    redirect: '/template',
  },
  {
    path: '/account',
    layout: false,
    routes: [
      {
        path: '/account',
        redirect: 'login',
      },
      {
        name: '登录',
        path: 'login',
        component: '@/pages/account/login/index',
      },
    ],
  },
  {
    path: '/template',
    menu: {
      name: 'Wetrial',
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
            path: 'list',
            name: '列表',
            access: Permissions.template.sample.list.index,
            menu: {
              hideChildren: true,
            },
            routes:[
              {
                path: '/template/sample/list',
                redirect: 'index',
              },
              {
                path: 'index',
                access: Permissions.template.sample.list.index,
                component: '@/pages/template/sample/list/index',
              },
              {
                path: 'simple-list',
                access: Permissions.template.sample.list.index,
                component: '@/pages/template/sample/list/simple-list',
              },
              {
                path: 'edit/:id?',
                component: '@/pages/template/sample/list/edit',
                access: Permissions.template.sample.list.edit,
              },
            ]
          },
          {
            path: 'tabs-share',
            name: '共享Tab',
            access: Permissions.template.sample.list.index,
            component:'@/pages/template/sample/tabs-share/index'
          },
          {
            path:'tree-form',
            name:'tree-form',
            component:'@/pages/template/sample/tree-form/index'
          }
        ],
      },
    ],
  }
];

export default routes;
export { Permissions };

