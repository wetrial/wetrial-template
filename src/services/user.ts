import { get, post } from '@/utils/request';
import { API_PREFIX } from '@/constants';

/**
 * 获取当前用户信息
 */
export async function getCurrent() {
  return await get(`${API_PREFIX}user/getCurrent`);
}

/**
 * 登录
 * @param {object} data 登录传递的数据
 */
export async function login(data) {
  return await post({
    url: `${API_PREFIX}user/login`,
    data,
    showTip: false,
  });
}

/**
 * 获取当前用户的权限列表
 */
export async function getCurrentPermissions() {
  return await get(`${API_PREFIX}user/getCurrentPermissions`);
}

/**
 * 注销登录
 */
export async function loginout() {
  return await get(`${API_PREFIX}user/loginout`);
}

/**
 * 获取个人的待办、消息、通知列表
 */
export async function queryNotices() {
  return get(`${API_PREFIX}message/getAll`);
}

/**
 * 获取个人的待办列表
 */
export async function getTodos() {
  return get(`${API_PREFIX}message/getTodos`);
}

/**
 * 获取个人的消息列表
 */
export async function getMessages() {
  return get(`${API_PREFIX}message/getMessages`);
}

/**
 * 获取个人的通知列表
 */
export async function getNotifys() {
  return get(`${API_PREFIX}message/getNotifys`);
}

/**
 * 将指定类型的消息设置为已读
 * @param type 指定的类型
 */
export async function setAllToRead(type) {
  return post({
    url: `${API_PREFIX}message/setAllToRead`,
    data: {
      type,
    },
  });
}
