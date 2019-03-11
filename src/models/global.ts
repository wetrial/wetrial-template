import modelExtend from 'dva-model-extend';
import { getNotifys, getProjectMenus, getCurrentUser, login } from '@/services/common/global';
import { model } from 'wetrial';
import { utils } from '@/wetrial';

const {base}=model;
const {setPermissions, setToken}=utils.store;

export default modelExtend(base, {
  namespace: 'global',
  state: {
    notify: {
      MessageCount: 0,
      NotifyCount: 0,
    },
    menus: [], // 菜单列表
    userInfo: {}, // 用户信息
    permissions: [], // 当前用户的权限列表
  },
  effects: {
    *fetchNotifys(_, { call, put }) {
      const result = yield call(getNotifys);
      yield put({
        type: 'updateState',
        payload: {
          notify: result,
        },
      });
    },
    // 当前用户及菜单数据
    *fetchCurrent(payload, { call, put }) {
      const currentUser = yield call(getCurrentUser);
      const menus = yield call(getProjectMenus, payload);

      yield setPermissions(currentUser.permissions);

      yield put({
        type: 'updateState',
        payload: {
          userInfo: currentUser.userInfo,
          permissions: currentUser.permissions,
          menus,
        },
      });
    },
    *login(payload, { call }) {
      const token = yield call(login, payload);
      yield setToken(token);
    },
  },
});
