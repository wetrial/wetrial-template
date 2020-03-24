import { Request, Response } from 'express';
import { sortBy, reverse } from 'lodash';
import { ListItemDto, Staged } from './prop.d';

function generateItem(id: number): ListItemDto {
  const staged = Staged[Staged[(id % 4) + 1]];
  return {
    id,
    status: Math.random() > 0.5,
    name: `姓名-${id}`,
    title: `标题-${id}`,
    desc: `描述内容-${id}`,
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
  const { pageSize, current, sorter } = req.query;

  for (let i = 1; i <= pageSize; i++) {
    const id = current * pageSize + i;
    const item = generateItem(id);
    items.push(item);
  }

  if (sorter) {
    const jsonSorter = JSON.parse(sorter);
    if (jsonSorter && jsonSorter.field) {
      items = sortBy(items, jsonSorter.field);
      if (jsonSorter.order === 'descend') {
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
  const item = generateItem(id as number);
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
