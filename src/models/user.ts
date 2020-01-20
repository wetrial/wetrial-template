// import router from "umi/router";
import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getCurrent } from '@/services/user';

export interface ICurrentUser {
  id: string;
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
}

export interface IUserModelState {
  currentUser: ICurrentUser;
}

export interface IUserModelType {
  namespace: 'user';
  state: IUserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<IUserModelState>;
    changeNotifyCount: Reducer<IUserModelState>;
  };
}
const UserModel: IUserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
