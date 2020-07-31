export * from '@wetrial/core/lib/constants';

// api 前缀
export const BASE_PATH = '/';
export const API_PREFIX = `${BASE_PATH}api/`;

export const COMPANY_NAME = '湖南微试云';

// 默认页码
export const PAGE_SIZE = 10;

// 分页属性
export const PAGE_PROPS = {
  defaultCurrent: 1,
  total: 1,
  pageSize: PAGE_SIZE,
  defaultPageSize: PAGE_SIZE,
  // showSizeChanger: true,
  hideOnSinglePage: true,
  // showQuickJumper:true,
  showTotal: (total, [start, end]) => `${start}-${end}，共${total}条`,
};
