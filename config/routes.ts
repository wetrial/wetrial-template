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
          {
            path: 'react-beautiful-dnd',
            name: 'beautiful dnd',
            routes:[
             {
               path:'demo1',
               name:'demo1',
               component: '@/pages/template/sample/react-beautiful-dnd/demo1/index',
             }
            ]
          },
          {
            path:'react-dnd',
            name:'react dnd',
            routes:[
             {
              path:'demo1',
              name:'demo1',
              component: '@/pages/template/sample/react-dnd/demo1',
              },
              {
                path:'nested',
                name:'嵌套',
                component: '@/pages/template/sample/react-dnd/nested',
              },
              {
                path:'drop-sources',
                name:'drop-sources',
                component: '@/pages/template/sample/react-dnd/drag-sources/index',
              },
              {
                path:'drop-targets',
                name:'drop-targets',
                component: '@/pages/template/sample/react-dnd/drop-targets/index',
              }
            ]
          }
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
      {
        path: '/account',
        // component: '@/layouts/UserLayout',
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
      ...PageRoutes,
    ],
  },
];

export default routes;
export { Permissions, PageRoutes };
