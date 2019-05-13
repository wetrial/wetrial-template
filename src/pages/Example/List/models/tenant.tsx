import extendModel from '@/wetrial/model';
import { GetTenants} from "@/services/example/tenant";

export default extendModel({
  namespace: 'example_tenant',
  state: {
    pagedData: {},
    model:{}
  },
  effects: {
    *getTenants({ payload }, { call, put }) {
      const { items, totalCount: total } = yield call(GetTenants, payload);

      yield put({
        type: 'update',
        payload: {
          pagedData: {
            items,
            total
          }
        }
      });
    }
  }
});
