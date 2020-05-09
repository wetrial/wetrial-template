import { Request, Response } from 'express';
import { sortBy, reverse } from 'lodash';
import { ListItemDto, Staged } from './prop.d';

function generateItem(id: number): ListItemDto {
  const staged = Staged[Staged[(id % 4) + 1]];
  const strId = id > 9 ? id : `0${id}`;
  return {
    id,
    status: Math.random() > 0.5,
    name: `姓名-${strId}`,
    title: `标题-${strId}`,
    desc: `描述内容-${strId}`,
    staged,
    progress: Math.floor(Math.random() * 100),
    address: {
      state: '中国',
      street: '湖南省长沙市。。。。。。。。。。。。。。',
    },
  };
}

function getList(req: Request, res: Response) {
  let items: ListItemDto[] = [];
  const { maxResultCount, skipCount, sorting } = req.query;

  for (let i = 1; i <= Number(maxResultCount); i++) {
    const item = generateItem(Number(skipCount) + i);
    items.push(item);
  }

  if (sorting) {
    const sorterParam = (sorting as string).split(' ');
    if (sorterParam) {
      items = sortBy(items, sorterParam[0]);
      if (sorterParam[1] === 'desc') {
        items = reverse(items);
      }
    }
  }

  return res.json({
    totalCount: 1000,
    items,
  });
}

function getItem(req: Request, res: Response) {
  const { id } = req.query;
  const item = generateItem(Number(id));
  return res.json(item);
}

export default {
  'GET /api/template/list/getList': getList,
  'GET /api/template/list/getItem': getItem,
  'PUT /api/template/list': (req: Request, res: Response) => {
    return res.json(req.body);
  },
  'DELETE /api/template/list': (req: Request, res: Response) => {
    return res.json();
  },
  'POST /api/template/list': (req: Request, res: Response) => {
    return res.json({
      id: 400,
      ...req.body,
    });
  },
};
