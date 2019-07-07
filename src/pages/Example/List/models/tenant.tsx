import extendModel from '@wetrial/model';
import { GetTenants, GetTenant } from '@/services/example/tenant';

export default extendModel({
  namespace: 'example_tenant',
  state: {
    pagedData: {},
    model: {},
  },
  effects: {
    *getTeannt({ payload }, { call, put }) {
      let model = {};
      if (payload.id) {
        model = yield call(GetTenant, payload);
      }

      yield put({
        type: 'update',
        payload: {
          model,
        },
      });
    },
    *getTenants({ payload }, { call, put }) {
      const { items, totalCount: total } = yield call(GetTenants, payload);

      yield put({
        type: 'update',
        payload: {
          pagedData: {
            items,
            total,
          },
        },
      });
    },
  },
});
