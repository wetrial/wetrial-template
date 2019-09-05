import { IRoute } from 'umi-types';

const exception: IRoute = {
  name: '异常',
  icon: 'warning',
  hideInMenu: true,
  path: '/exception',
  routes: [
    // exception
    {
      path: '/exception/403',
      name: '无权限',
      component: './Exception/403',
    },
    {
      path: '/exception/404',
      name: '404',
      component: './Exception/404',
    },
    {
      path: '/exception/500',
      name: '500',
      component: './Exception/500',
    },
    {
      path: '/exception/trigger',
      name: 'trigger',
      hideInMenu: true,
      component: './Exception/TriggerException',
    },
  ],
};

export default exception;
