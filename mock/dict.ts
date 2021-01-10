import type { Request, Response } from 'express';
import { authorizeIntercept } from './_base';

const getCountrys = (request: Request, response: Response) => {
  const result = [
    {
      id: '43',
      name: '湖南省',
      citys: [
        {
          id: '4301',
          name: '长沙市',
        },
        {
          id: '4302',
          name: '株洲市',
        },
        {
          id: '4303',
          name: '湘潭市',
        },
        {
          id: '4304',
          name: '衡阳市',
        },
        {
          id: '4305',
          name: '邵阳市',
        },
      ],
    },
    {
      id: '44',
      name: '广东省',
      citys: [
        {
          id: '4401',
          name: '广州市',
        },
        {
          id: '4402',
          name: '韶关市',
        },
        {
          id: '4402',
          name: '深圳市',
        },
        {
          id: '4404',
          name: '珠海市',
        },
        {
          id: '4405',
          name: '汕头市',
        },
      ],
    },
  ];
  authorizeIntercept({ request, response }, result);
};

export default {
  'GET /api/dict/getCountrys': getCountrys,
};
