import extendModel from '@/wetrial/model';
import { getAll } from '@/services/message';

export default extendModel({
  namespace: 'global',
  state: {
    collapsed: false, // 左侧菜单面板是否折叠
    total:0, // 总数量
    // 待办列表
    todos: {
      items:[],
      totalCount:0
    }, 
     // 消息列表
    messages:{
      items:[],
      totalCount:0
    },
     // 通知列表
    notifys:{
      items:[],
      totalCount:0
    }
  },
  effects: {
    *fetchNotices(_, { call, put }) {
      const all = yield call(getAll);
      yield put({
        type: 'update',
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
    }    
  },
  reducers:{
    changeCollapsed(state,{payload}){
      return {
        ...state,
        collapsed:payload
      }
    }
  },
  subscriptions: {
    // setup({ history }) {
    //   // Subscribe history(url) change, trigger `load` action if pathname is `/`
    //   return history.listen(({ pathname, search }) => {
    //     if (typeof window.ga !== 'undefined') {
    //       window.ga('send', 'pageview', pathname + search);
    //     }
    //   });
    // },
  }
});
