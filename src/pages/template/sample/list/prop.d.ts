export enum Staged {
  planing = 1,
  doing = 2,
  completed = 3,
  failed = 4,
}

export interface ListItemDto {
  id: number;
  status?: boolean;
  name: string;
  title: string;
  desc: string;
  staged: Staged;
  progress: number;
  address?: {
    state: string;
    street: string;
  };
}

export const StagedDict = [
  {
    label: '计划中',
    value: Staged.planing,
  },
  {
    label: '进行中',
    value: Staged.doing,
  },
  {
    label: '已完成',
    value: Staged.completed,
  },
  {
    label: '失败',
    value: Staged.failed,
  },
];
