import React from 'react';
import PromiseRender from './PromiseRender';
import { CURRENT } from './renderAuthorize';
import { TReactComponent, TAuthority } from './IProps';
import { isPromise } from '../utils';

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { string|array|Promise|Function } authority 权限判定
 * @param { string } currentAuthority 你的权限
 * @param { any } target 通过的组件
 * @param { any } Exception 未通过的组件
 */
const checkPermissions = (
  authority: TAuthority,
  currentAuthority: string | string[],
  target: TReactComponent,
  Exception: TReactComponent
): TReactComponent => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;
  if (!authority) {
    return target;
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (typeof currentAuthority === 'string') {
      if (authority.indexOf(currentAuthority) !== -1) {
        return target;
      }
    } else if (Array.isArray(currentAuthority)) {
      for (const element of currentAuthority) {
        if (authority.indexOf(element) !== -1) {
          return target;
        }
      }
    }
    return Exception;
  }

  // string 处理
  if (typeof authority === 'string') {
    if (typeof currentAuthority === 'string') {
      if (authority === currentAuthority) {
        return target;
      }
    } else if (Array.isArray(currentAuthority)) {
      for (const element of currentAuthority) {
        if (authority === element) {
          return target;
        }
      }
    }
    return Exception;
  }

  // Promise 处理
  if (isPromise(authority)) {
    return <PromiseRender ok={target} error={Exception} promise={authority} />;
  }

  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority);
      // 函数执行后返回值是 Promise
      if (isPromise(bool)) {
        return <PromiseRender ok={target} error={Exception} promise={bool} />;
      }
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};

/**
 * js形式判断是否有权限
 * @param authority 需要的权限
 * @param currentAuthority 当前用户权限
 * @param {bool} 返回true表示有权限，否则没有权限
 */
const hasPermissions = (
  authority: string | string[],
  currentAuthority: string | string[]
): boolean => {
  if (!authority) {
    return true;
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (typeof currentAuthority === 'string') {
      if (authority.indexOf(currentAuthority) !== -1) {
        return true;
      }
    } else if (Array.isArray(currentAuthority)) {
      for (const element of currentAuthority) {
        if (authority.indexOf(element) !== -1) {
          return true;
        }
      }
    }
    return false;
  }

  // string 处理
  if (typeof authority === 'string') {
    if (typeof currentAuthority === 'string') {
      if (authority === currentAuthority) {
        return true;
      }
    } else if (Array.isArray(currentAuthority)) {
      for (const element of currentAuthority) {
        if (authority === element) {
          return true;
        }
      }
    }
    return false;
  }
  throw new Error('unsupported parameters');
};

/**
 * 检查当前用户是否有权限
 * @param authority 需要的权限
 * @param target 通过时展示返回
 * @param Exception  未通过时返回
 */
const check = (
  authority: TAuthority,
  target: TReactComponent,
  Exception: TReactComponent
): TReactComponent => checkPermissions(authority, CURRENT, target, Exception);

export { checkPermissions, hasPermissions };
export default check;
