// api 前缀
export const BASE_PATH = process.env.REACT_APP_ENV === 'dev' ? `https://localhost:44321/` : '/';
export const API_PREFIX = `${BASE_PATH}api/`;

export const COMPANY_NAME = '湖南微试云';

// 默认页码
export const PAGE_SIZE = 15;

// 分页属性
export const PAGE_PROPS = {
  defaultCurrent: 1,
  total: 1,
  pageSize: PAGE_SIZE,
  defaultPageSize: PAGE_SIZE,
  // showSizeChanger: true,
  hideOnSinglePage: true,
  // showQuickJumper:true,
  showTotal: (total, _, pageSize) => {
    return `每页${pageSize || PAGE_SIZE}条，共${total}条`;
  },
};

// 两列布局
export const FORM_TWO_LAYOUT = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 6 },
    md: { span: 5 },
    lg: { span: 8 },
    xl: { span: 8 },
    xxl: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 18 },
    md: { span: 19 },
    lg: { span: 16 },
    xl: { span: 16 },
    xxl: { span: 20 },
  },
};

// label占1/4 元素框占3/4
export const FORM_SINGLE_LAYOUT = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 6 },
    md: { span: 5 },
    lg: { span: 4 },
    xl: { span: 4 },
    xxl: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 18 },
    md: { span: 19 },
    lg: { span: 20 },
    xl: { span: 20 },
    xxl: { span: 22 },
  },
};

export const COL_LAYOUT = {
  xs: 24, // <576px
  sm: 24, // ≥576px
  md: 24, // ≥768px
  lg: 12, // ≥992px
  xl: 12, // ≥1200px
  xxl: 12, // ≥1600px
};

// table 显示滚动条的宽度界限
export const TABLE_SCROLL_WIDTH = 1300;
