import { routerRedux } from 'dva/router';
import { fetchCurrentUser } from '@/services/user';
import {setToken} from '@/wetrial/store'

export default {
  namespace: 'login',

  state: {},

  effects: {
    *fetchLogin({ payload }, { call, put }) {
      const response = yield call(fetchCurrentUser, payload);
      // login success
      if (response && response.code === 200) {
        const { token } = response.data;
        if (token) {
          setToken(token);
        }
        const urlParams = new URL(window.location.href);
        let redirect='';
        // 处理登录重定向
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    }
  }
};
