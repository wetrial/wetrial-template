/** model扩展类 帮助快速创建model */
import extend from 'dva-model-extend';

/**
 * 通用model
 */
export const base = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

/**
 * 分页model
 */
export const page = extend(base, {
  state: {
    paged: {
      Items: [],
      Total: 1
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },
})

export default {
  base,
  page,
  extend
}