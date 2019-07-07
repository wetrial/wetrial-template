import { get, post } from '@wetrial/request';
import { API_PREFIX } from '@/constants';


/**
 * 获取当前用户信息
 */
export function getCurrent() {
  return get(`${API_PREFIX}user/getCurrent`);
}

/**
 * 登录
 * @param {object} data 登录传递的数据
 */
export function login(data) {
  return post({
    url: `${API_PREFIX}user/login`,
    data,
  });
}

/**
 * 注销登录
 */
export function loginout() {
  return get(`${API_PREFIX}user/loginout`);
}
