import type { Request, Response } from 'express';
import { reverse, sortBy } from 'lodash';

const USER_NAMES = ['百里玄策', '孙悟空', '娜可露露', '安其拉', '后裔', '蔡文姬', '猪八戒', '赵云'];
const ISSUE_STATUS = ['open', 'closed', 'processing'];
export const LABELS = [
  { value: 'bug', label: 'bug', color: 'red' },
  { value: 'question', label: 'question', color: 'blue' },
  { value: 'dependencies', label: 'dependencies', color: 'gray' },
  { value: 'todo', label: 'todo', color: 'cyan' },
  { value: 'Feature Request', label: 'Feature Request', color: 'purple' },
];

function generateItem(id: number, isEdit: boolean = false) {
  const labelStart = Math.floor(Math.random() * LABELS.length);
  const labelValues = LABELS.slice(labelStart, labelStart + Math.floor(Math.random() * 3));
  return {
    id,
    url: `https://github.com/wetrial/wetrials/issues/${id}`,
    title: `这是bug的标题-${id}`,
    labels: isEdit ? labelValues.map((item) => item.value) : labelValues,
    status: ISSUE_STATUS[Math.floor(Math.random() * ISSUE_STATUS.length)],
    comments: Math.floor(Math.random() * 20),
    content:
      id % 2 === 0
        ? `简短备注文案-${id}`
        : '很长很长很长很长很长很长很长的很长很长很长很长的Bug-${i}',
    assigner: USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)],
    createdTime: Date.now() - 86400000 - Math.floor(Math.random() * 2000),
    closeTime: Date.now() - Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100),
    money: Math.random() * 10000,
  };
}

function getList(req: Request, res: Response) {
  let items: any[] = [];
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
  const item = generateItem(Number(id), true);
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
