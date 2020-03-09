import { router } from 'umi';
import { stringify } from 'qs';
import extend from '@wetrial/core/model';
import { getPageQuery } from '@/utils';
import { login, getCurrentUser } from '@/services/account';
import { setPermissions, setToken, clearPermissions, clearToken } from '@/utils/authority';

export interface ICurrentUser {
  avatar: string;
  name: string;
  id: string;
  email: string;
  permissions: string[];
  unreadCount: number;
}

export interface IAccountModelState {
  currentUser?: ICurrentUser;
}

export default extend<IAccountModelState>({
  namespace: 'account',
  state: {
    currentUser: {
      unreadCount: 0,
    } as ICurrentUser,
  },
  effects: {
    *login({ payload }, { call }) {
      const token = yield call(login, payload);
      setToken(token);

      const params = getPageQuery();
      const { redirect } = params as { redirect: string };

      if (redirect) {
        window.location.href = redirect;
        return;
      }
      router.push({
        pathname: '/',
      });
    },
    *getCurrentUser(_, { call, put }) {
      const currentUser = yield call(getCurrentUser);
      setPermissions(currentUser.permissions);
      yield put({
        type: 'update',
        payload: {
          currentUser,
        },
      });
    },
    logout() {
      clearToken();
      clearPermissions();
      const { redirect } = getPageQuery();
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/account/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
});
