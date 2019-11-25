import { message } from 'antd';
import { UnAuthorizedException, UserFriendlyException } from '@wetrial/exception';

/**
 * TODO 可以根据自己的情况来扩展、覆写请求
 * exp 删除通用拦截器 添加自定义拦截器。。。
 */
import { instance, commonRequestInterceptor } from '@wetrial/request';

instance.interceptors.request.use(...commonRequestInterceptor);
instance.interceptors.response.use(
  (rep): any => {
    const { config } = rep;
    // eslint-disable-next-line dot-notation
    if (config['showTip']) {
      message.success('操作成功', 2);
    }
    const {
      data = {
        result: null,
      },
    } = rep;
    return data['result'];
  },
  ({ response }) => {
    const { error, unAuthorizedRequest } = response.data;
    let exception;
    if (unAuthorizedRequest) {
      exception = new UnAuthorizedException(error.message);
    } else if (error) {
      exception = new UserFriendlyException();
      exception.code = error.code;
      exception.details = error.details;
      exception.message = error.message;
      exception.validationErrors = error.validationErrors;
    } else {
      exception = new Error(response.statusText);
    }
    return Promise.reject(exception);
  },
);

export { request, get, post, put, patch } from '@wetrial/request';
