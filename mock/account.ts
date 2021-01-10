import type { Request, Response } from 'express';
import { authorizeIntercept, responseWrapper } from './_base';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/account/getCurrentUser': (request: Request, response: Response) => {
    let permissions: string[] = [];
    const token = request.get('Authorization');
    if (request && token && token !== 'null') {
      // 超级管理员
      if (token === 'Bearer 10000') {
        permissions = [
          'template.dashboard',
          'template.sample',
          'template.sample.list',
          'template.sample.list.edit',
          'template.sample.list.delete',
        ];
      } else {
        permissions = ['template.dashboard'];
      }
    }
    const result = {
      name: 'XXG',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      id: '00000001',
      email: 'xiexingen@outlook.com',
      unreadCount: 11,
      phone: '0752-268888888',
      permissions,
    };
    authorizeIntercept({ request, response }, result);
  },
  'POST /api/account/login': (request: Request, response: Response) => {
    const { password, identificationName } = request.body;
    if (
      password === 'Abcd1234' &&
      (identificationName === 'admin' || identificationName === 'user')
    ) {
      // 00000普通用户 10000超级管理员
      const tokenValue = identificationName === 'user' ? '00000' : '10000';
      response.json(tokenValue);
      return;
    }
    response.status(500);
    response.json({
      code: 'login-error',
      error: {
        showType: 2,
        message: '用户名或者密码错误',
      },
      details: {},
    });
  },
  'POST /api/account/register': (request: Request, response: Response) => {
    response.json(responseWrapper('00000'));
  },
};
