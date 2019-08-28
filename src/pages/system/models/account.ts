export default {
  namespace: 'systemAccount',

  state: {
    tableData: {
      list: [],
      pagination: {
        current: 1,
        total: 0,
      },
    },
  },
  reducers: {
    saveTableData(state, { payload }) {
      return {
        ...state,
        tableData: payload,
      };
    },
  },
};
