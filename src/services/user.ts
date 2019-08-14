import { get, post } from '@wetrial/request';
import { API_PREFIX } from '@/constants';


/**
 * 获取当前用户信息
 */
export async function getCurrent() {
  return get(`${API_PREFIX}user/getCurrent`);
}

/**
 * 登录
 * @param {object} data 登录传递的数据
 */
export async function login(data) {
  return post({
    url: `${API_PREFIX}user/login`,
    data,
  });
}

/**
 * 获取当前用户的权限列表
 */
export async function getCurrentPermissions(){
  return get(`${API_PREFIX}user/getCurrentPermissions`);
}

/**
 * 注销登录
 */
export async function loginout() {
  return get(`${API_PREFIX}user/loginout`);
}
