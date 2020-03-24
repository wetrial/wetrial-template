import extend from '@wetrial/core/model';
import { login, getCurrentUser } from '@/services/account';
import { setToken } from '@/utils/authority';

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
    },
    *getCurrentUser(_, { call, put }) {
      const currentUser = yield call(getCurrentUser);

      yield put({
        type: 'update',
        payload: {
          currentUser,
        },
      });
    },
  },
});
