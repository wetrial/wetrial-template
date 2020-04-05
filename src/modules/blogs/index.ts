import { IBestAFSRoute } from '@umijs/plugin-layout';

const ROUTE_BASE = '@/modules/blogs/';

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
    path: '/blogs',
    menu: {
      name: '博客', // 兼容此写法
      // hideChildren:false,
      flatMenu: true,
    },
    routes: [
      {
        path: '/blogs',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        name: '博客看板',
        icon: 'dashboard',
        access: Permissions.template.dashboard.index,
        component: `${ROUTE_BASE}dashboard/index`,
      },
      {
        path: 'sample',
        name: '博客例子',
        access: Permissions.template.sample.index,
        icon: 'smile',
        routes: [
          {
            path: '/blogs/sample',
            redirect: 'list',
          },
          {
            path: 'list',
            name: '博客列表',
            access: Permissions.template.sample.list.index,
            component: `${ROUTE_BASE}sample/list/index`,
            exact: true,
          },
          {
            path: 'list/edit/:id?',
            component: `${ROUTE_BASE}sample/list/edit`,
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
