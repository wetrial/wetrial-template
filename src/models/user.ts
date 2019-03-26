// import router from "umi/router";
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import extendModel from '@/wetrial/model';
import {clearToken,setToken} from '@/wetrial/store';
import { getCurrent,loginout,login } from '@/services/user';
import { reloadAuthorized } from '@/utils/Authorized';
import {getRedirect} from '@/utils';
import { notification } from 'antd';

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
    *login({ payload }, { call, put }) {
      const result = yield call(login, payload);
      // login success
      if (result&&result.token) {
        setToken(result.token);
        reloadAuthorized();
        const redirect=getRedirect();
        yield put(routerRedux.replace(redirect));
      }
    },
    *loginOut(_,{call,put}){
      yield call(loginout);
      yield clearToken();
      yield reloadAuthorized();
      yield put(
        routerRedux.replace({
          pathname: '/user/login',
        })
      )
    },
    // 当request获取api后端数据 算作未登录时，触发此effects
    *unAuthorizedRedirect(_,{put}){
      notification.error({
        message:'提示',
        description: '登录已过期，请重新登录',
      });
      // router.push()
      yield put(
        routerRedux.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      )
    }
  }
});
