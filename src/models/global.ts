import extendModel from '@/wetrial/model';
import { getAll, getNotifys, getMessages, getTodos, setAllToRead } from '@/services/message';

// 计算总数
const calcTotal = (state) => {
  let total = 0;
  const { todos, messages, notifys } = state;
  if (todos && todos.totalCount) {
    total += todos.totalCount;
  }
  if (messages && messages.totalCount) {
    total += messages.totalCount;
  }
  if (notifys && notifys.totalCount) {
    total += notifys.totalCount;
  }
  return total;
}

export default extendModel({
  namespace: 'global',
  state: {
    collapsed: false, // 左侧菜单面板是否折叠
    total: 0, // 总数量
    // 待办列表
    todos: {
      items: [],
      totalCount: 0
    },
    // 消息列表
    messages: {
      items: [],
      totalCount: 0
    },
    // 通知列表
    notifys: {
      items: [],
      totalCount: 0
    }
  },
  effects: {
    *getAll(_, { call, put }) {
      const all = yield call(getAll);
      yield put({
        type: 'updateWithSum',
        payload: all
      });
      // const unreadCount = yield select(
      //   state => state.global.notices.filter(item => !item.read).length
      // );
      // yield put({
      //   type: 'user/update',
      //   payload: {
      //     totalCount: data.length,
      //     unreadCount,
      //   },
      // });
    },
    *getNotifys(_, { call, put }) {
      const notifys = yield call(getNotifys);
      yield put({
        type: 'updateWithSum',
        payload: {
          notifys
        }
      });
    },
    *getTodos(_, { call, put }) {
      const todos = yield call(getTodos);
      yield put({
        type: 'updateWithSum',
        payload: {
          todos
        }
      });
    },
    *getMessages(_, { call, put }) {
      const messages = yield call(getMessages);
      yield put({
        type: 'updateWithSum',
        payload: {
          messages
        }
      });
    },
    *setAllToRead({ payload }, { call, put }) {
      yield call(setAllToRead, payload);
      yield put({
        type:'updateWithSum',
        payload:{
          
        }
      })
    }
  },
  reducers: {
    changeCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload
      }
    },
    updateWithSum(state, { payload }) {
      const result = {
        ...state,
        ...payload
      }
      const total = calcTotal(result);
      return {
        ...state,
        ...payload,
        total
      }
    }
  },
  // subscriptions: {
  // setup({ history }) {
  //   // Subscribe history(url) change, trigger `load` action if pathname is `/`
  //   return history.listen(({ pathname, search }) => {
  //     if (typeof window.ga !== 'undefined') {
  //       window.ga('send', 'pageview', pathname + search);
  //     }
  //   });
  // },
  // }
});
