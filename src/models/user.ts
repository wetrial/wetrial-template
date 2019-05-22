// import router from "umi/router";
import { routerRedux } from 'dva/router';
import extendModel from '@/wetrial/model';
import { clearToken, setToken } from '@/utils/store';
import { getCurrent, loginout, login } from '@/services/user';
import { setPermissions, clearPermissions } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { getRedirect } from '@/utils';

export default extendModel({
  namespace: 'user',
  state: {
    currentUser: {
      permissions: null,
    },
  },
  effects: {
    *getCurrent(_, { call, put }) {
      const currentUser = yield call(getCurrent);

      yield put({
        type: 'update',
        payload: {
          currentUser,
        },
      });
    },
    *login({ payload }, { call, put }) {
      const result = yield call(login, payload);
      // login success
      if (result && result.token) {
        yield setToken(result.token);
        yield setPermissions(result.permissions);
        yield reloadAuthorized();
        const redirect = getRedirect();
        yield put(routerRedux.replace(redirect));
      }
    },
    *loginOut(_, { call, put }) {
      yield call(loginout);
      yield clearToken();
      yield clearPermissions();
      yield put(
        routerRedux.replace({
          pathname: '/user/login',
        })
      );
    },
    // // 当request获取api后端数据 算作未登录时，触发此effects
    // *unAuthorizedRedirect(_,{put}){
    //   notification.error({
    //     message:'提示',
    //     description: '登录已过期，请重新登录',
    //   });

    //   yield put(
    //     routerRedux.push({
    //       pathname: '/user/login',
    //       search: stringify({
    //         redirect: window.location.href,
    //       }),
    //     })
    //   )
    // }
  },
});
