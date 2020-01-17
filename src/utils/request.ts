/**
 * TODO 可以根据自己的情况来扩展、覆写请求
 * exp 删除通用拦截器 添加自定义拦截器。。。
 */
import {
  commonRequestInterceptor,
  commonResponseInterceptor,
  useRequestInterceptor,
  useResponseInterceptor,
} from '@wetrial/core';

useRequestInterceptor(...commonRequestInterceptor);
useResponseInterceptor(...commonResponseInterceptor);

export { request, get, post, put, patch } from '@wetrial/core';
