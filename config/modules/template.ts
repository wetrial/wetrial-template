import { IRoute } from 'umi-types';

/**
 * 权限定义
 */
const Permissions = {
  template: {
    base: 'template.base',
    dashboard: {
      base: 'template.dashboard.base',
    },
  },
};

/**
 * 路由定义
 */
const TemplateRoutes: IRoute[] = [
  {
    path: '/template',
    name: '例子',
    authority: Permissions.template.base,
    icon: 'smile',
    routes: [
      { path: '/template', redirect: '/template/dashboard' },
      {
        path: 'dashboard',
        name: '看板',
        authority: Permissions.template.dashboard.base,
        component: './template/dashboard/index',
      },
    ],
  },
];

export default Permissions;
export { TemplateRoutes };
