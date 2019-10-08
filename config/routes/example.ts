import { IRoute } from 'umi-types';
import Permissions from '../permissions';

const example: IRoute = {
  path: '/example',
  name: '例子',
  authority: Permissions.example.base,
  icon: 'smile',
  routes: [
    { path: '/example', redirect: '/example/test' },
    {
      path: '/example/test',
      name: '测试页面',
      authority: Permissions.example.reactDnd,
      component: './Example/Test/index',
    },
    {
      path: '/example/permission',
      name: '权限',
      authority: Permissions.example.permission,
      component: './Example/Permission/index',
    },
    {
      path: '/example/drag',
      name: '拖拽',
      authority: Permissions.example.reactDnd,
      component: './Example/Drag-Drop/index',
    },
    {
      path: '/example/scrollbar',
      name: '滚动条',
      authority: Permissions.example.scroll,
      component: './Example/ScrollBar/index',
    },
    {
      path: '/example/list',
      name: '列表',
      exact: true,
      authority: Permissions.example.list,
      component: './Example/List/index',
    },
    {
      path: '/example/list/mergerowlist',
      name: '列表(合并)',
      hideInMenu: true,
      exact: true,
      authority: Permissions.example.list,
      component: './Example/List/MergeRowList',
    },
    {
      path: '/example/list/:id?',
      hideInMenu: true,
      authority: Permissions.example.list,
      component: './Example/List/edit',
    },
  ],
};

export default example;
