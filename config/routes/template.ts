import { IRoute } from 'umi-types';

/**
 * 权限定义
 */
const Permissions = {
  template: {
    dashboard: {
      base: 'template.dashboard.base',
    },
    list: {
      base: 'template.list.base',
    },
  },
};

/**
 * 路由定义
 */
const TemplateRoutes: IRoute[] = [
  {
    path: '/template',
    name: '看板',
    icon: 'dashboard',
    authority: Permissions.template.dashboard.base,
    component: './Template/Dashboard/index',
  },
  {
    path: '/template-list',
    name: '列表',
    authority: Permissions.template.list.base,
    icon: 'smile',
    routes: [
      { path: '/template-table', redirect: '/template-list/table' },
      {
        path: 'table',
        name: '普通表格',
        component: './Template/TableList/index',
      },
    ],
  },
];

export default Permissions;
export { TemplateRoutes };
