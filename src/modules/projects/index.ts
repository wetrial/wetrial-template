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
const Routes: IBestAFSRoute[] = [
  {
    path: '/projects',
    menu: {
      name: '项目欢迎', // 兼容此写法
      // hideChildren:false,
      flatMenu: true,
    },
    routes: [
      {
        path: '/projects',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        name: '项目看板',
        icon: 'dashboard',
        access: Permissions.template.dashboard.index,
        component: '@/modules/projects/dashboard/index',
      },
      {
        path: 'sample',
        name: '项目案例',
        access: Permissions.template.sample.index,
        icon: 'smile',
        routes: [
          {
            path: '/projects/sample',
            redirect: 'list',
          },
          {
            path: 'list',
            name: '项目列表',
            access: Permissions.template.sample.list.index,
            component: '@/modules/projects/sample/list/index',
            exact: true,
          },
          {
            path: 'list/edit/:id?',
            component: '@/modules/projects/sample/list/edit',
            access: Permissions.template.sample.list.edit,
            exact: true,
          },
        ],
      },
    ],
  },
];

export default Routes;
export { Permissions };
