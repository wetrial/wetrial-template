import extend from '@wetrial/core/model';
import { NoticeIconData } from '@/components/NoticeIcon';
import { getMessages } from '@/services/message';

export interface NoticeItem extends NoticeIconData {
  id: string;
  type: string;
  status: string;
}

export interface IGlobalModelState {
  collapsed: boolean;
  notices: NoticeItem[];
  messageCount: number;
}

export default extend<IGlobalModelState>({
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
    messageCount: 0,
  },
  effects: {
    *getMessages(_, { call, put }) {
      const notices = yield call(getMessages);
      yield put({
        type: 'update',
        payload: {
          notices,
          messageCount: notices.length,
        },
      });
      // const unreadCount: number = yield select(
      //   (state: IConnectState) => state.global.notices.filter(item => !item.read).length,
      // );
    },
    *clearMessages(_, { put }) {
      yield put({
        type: 'update',
        payload: {
          messageCount: 0,
          notices: [],
        },
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(state = {} as IGlobalModelState, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },
  // subscriptions: {
  //   setup({ history }): void {
  //     // Subscribe history(url) change, trigger `load` action if pathname is `/`
  //     history.listen(({ pathname, search }): void => {
  //       if (typeof window.ga !== 'undefined') {
  //         window.ga('send', 'pageview', pathname + search);
  //       }
  //     });
  //   },
  // },
});
