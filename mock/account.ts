import { Request, Response } from 'express';
import { authorizeIntercept, errorWrapper, responseWrapper } from './_base';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/account/getCurrentUser': (request: Request, response: Respons) => {
    const result = {
      name: 'XXG',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      id: '00000001',
      email: 'xiexingen@outlook.com',
      unreadCount: 11,
      phone: '0752-268888888',
      permissions: ['template.dashboard.base', 'template.list.base'],
    };
    authorizeIntercept({ request, response }, result);
  },
  'POST /api/account/login': (request: Request, response: Response) => {
    const { password, identificationName } = request.body;
    if (password === 'Abcd1234' && identificationName === 'admin') {
      response.json(responseWrapper('10000'));
      return;
    }
    response.json(errorWrapper({}, false, '用户名或者密码错误'));
  },
  'POST /api/account/register': (request: Request, response: Response) => {
    response.json(responseWrapper('10000'));
  },
};
