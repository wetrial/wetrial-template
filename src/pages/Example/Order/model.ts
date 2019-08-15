import extendModel from '@wetrial/model';
import { GetPagedList } from './service';

export default extendModel({
namespace: 'example_order',
state: {
    pagedData: {},
    // model: {},
},
effects: {
    *getPagedList({ payload }, { call, put }) {
        GetPagedList({}).then(result=>{
            const ff=result;
        })
    const pagedData = yield call(GetPagedList, payload);
    yield put({
        type: 'update',
        payload: {
        pagedData
        },
    });
    }
},
});