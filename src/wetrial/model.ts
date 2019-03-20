import extendModel from 'dva-model-extend';

interface IModel {
    namespace: string;
    state:object;
    effects?:object;
    reducers?:object;
    subscriptions?:object
}

const baseModel = {
    reducers: {
        update(state, {payload}) {
            return {
                ...state,
                ...payload
            }
        }
    }
}

/**
 * 扩展基础model
 * @param model 页面model
 */
export default function extend(model: IModel) {
    return extendModel(baseModel, model);
}

