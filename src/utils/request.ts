import {
  addRequestInterceptor,
  addResponseInterceptor,
  commonRequestInterceptor,
  commonResponseInterceptor,
} from '@wetrial/core/request';

addRequestInterceptor(...commonRequestInterceptor);
addResponseInterceptor(...commonResponseInterceptor);

export { request, get, post, put, patch, del, head, options } from '@wetrial/core/request';
