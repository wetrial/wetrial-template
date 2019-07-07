import { message } from 'antd';
import {
  UnAuthorizedException,
  UserFriendlyException,
} from '@wetrial/exception';
/**
 * TODO 可以根据自己的情况来扩展、覆写请求
 * exp 删除通用拦截器 添加自定义拦截器。。。
 */
import { instance, commonResponseInterceptor } from '@wetrial/request';

instance.interceptors.response.eject(commonResponseInterceptor);
instance.interceptors.response.use(
  opt => {
    if (
      opt.config.responseType &&
      opt.config.responseType.toLowerCase() === 'arraybuffer'
    ) {
      return opt;
    } else {
      // eslint-disable-next-line dot-notation
      if (opt.config['showTip']) {
        message.success('操作成功', 1.5);
      }
      return opt.data.result;
    }
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

export { get, post, put, del, patch, request } from '@wetrial/request';
