import extendModel from '@/wetrial/model';
import { getCurrent,loginout } from '@/services/user';

export default extendModel({
  namespace: 'user',
  state: {
    currentUser: {}
  },
  effects: {
    *getCurrent(_, { call, put }) {
      const currentUser = yield call(getCurrent);
      yield put({
        type: 'update',
        payload: {
          currentUser
        },
      });
    },
    *loginOut(_,{call}){
      yield call(loginout);
      // TODO 跳转到登录页面
    }
  }
});
