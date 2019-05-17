import axios, { AxiosRequestConfig } from 'axios';

import { omit, assign } from 'lodash';
import {  message } from 'antd';
import { getToken } from './store';
import { UnAuthorizedException,UserFriendlyException } from './exception';

interface IRequestOption extends AxiosRequestConfig {
  showTip?: boolean; // 操作成功是否提示
  url: string; // 请求的url
  method?: 'post' | 'get' | 'put' | 'delete' | 'patch';
}

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 通用请求拦截器
 */
const commonRequestInterceptor = instance.interceptors.request.use(config => {
  assign(config.headers, {
    Authorization: `Bearer ${getToken()}`
  });
  return config;
});

/**
 * 通用响应拦截，拦截异常信息(非200-302之间的状态码)、未授权等
 */
const commonResponseInterceptor = instance.interceptors.response.use(
  ({data,config}) => {
    if(config['showTip']){
      message.success('操作成功',1.5);
    }
    return data.result;
  },
  ({response}) => {
    const {error,unAuthorizedRequest}=response.data;
    let exception;
    if(unAuthorizedRequest){
      exception=new UnAuthorizedException(error.message);
    }else if(error){
      exception=new UserFriendlyException;
      exception.code=error.code;
      exception.details=error.details;
      exception.message=error.message;
      exception.validationErrors=error.validationErrors; 
    }else{
      exception=new Error(response.statusText);
    }
    return Promise.reject(exception);
  }
);

const request = (opt: IRequestOption) => {
  return instance.request(opt);
};

export const get = (opt: IRequestOption | string) => {
  let options: IRequestOption;
  if (typeof opt === 'string') {
    options = {
      url: opt as string,
    };
  } else {
    options = opt;
  }
  return request({
    ...omit(options, 'data'),
    method: 'get',
    params: { timespan: new Date().getTime(), ...options.data },
    showTip: false,
  });
};

export const post = (opt: IRequestOption) => {
  return request({
    showTip: true,
    ...opt,
    method: 'post'
  });
};

export const put = (opt: IRequestOption) => {
  return request({
    showTip: true,
    ...opt,
    method: 'put',
  });
};

export const patch = (opt: IRequestOption) => {
  return request({
    showTip: true,
    ...opt,
    method: 'patch',
  });
};

export const del = (opt: IRequestOption) => {
  return request({
    showTip: true,
    ...opt,
    method: 'delete',
  });
};

export { instance,request, commonRequestInterceptor, commonResponseInterceptor };