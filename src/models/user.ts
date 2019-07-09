// import router from "umi/router";
import { routerRedux } from 'dva/router';
import WetrialPermissions from '@config/permissions';
import extendModel from '@wetrial/model';
import { clearToken, setToken } from '@/utils/store';
import { getCurrent,getCurrentPermissions, loginout, login } from '@/services/user';
import { setPermissions, clearPermissions,getPermissions } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { getRedirect } from '@/utils';

export default extendModel({
  namespace: 'user',
  state: {
    // 当前用户信息
    currentUser:{},
    // 当前用户权限列表
    permissions: getPermissions(),
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
        yield put({
          type:'reloadAuthorized',
          payload:{
            ...result
          }
        })
        const redirect = getRedirect();
        yield put(routerRedux.replace(redirect));
      }
    },
    // 重新加载权限 
    *reloadAuthorized({payload:{token,permissions}},{put}){
      if (token){
        yield setToken(token);
      }
      if(permissions){
        yield setPermissions(permissions);
        yield reloadAuthorized();
        yield put({
          type: 'update',
          payload:{
            permissions
          }
        })
      }      
    },
    *testToggleAuthorized({payload:{isAdmin}},{call,put}){
      let permissions=yield call(getCurrentPermissions);
      if(!isAdmin){
        permissions=permissions.filter(item=>item!==WetrialPermissions.example.reactDnd)
      }
      yield put({
        type:'reloadAuthorized',
        payload:{
          permissions
        }
      })
    },
    *loginOut(_, { call, put }) {
      yield call(loginout);
      yield clearToken();
      yield clearPermissions();
      yield put(
        routerRedux.replace({
          pathname: '/user/login',
        }),
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
  }
});
