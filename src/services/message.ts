import {API_PREFIX} from '@/constants';
import { get } from '@/wetrial/request';

/**
 * 获取个人的待办、消息、通知列表
 */
export function getAll() {
  return get(`${API_PREFIX}message/getAll`);
}

/**
 * 获取个人的待办列表
 */
export function getTodos() {
  return get(`${API_PREFIX}message/getTodos`);
}

/**
 * 获取个人的消息列表
 */
export function getMessages() {
  return get(`${API_PREFIX}message/getMessages`);
}

/**
 * 获取个人的通知列表
 */
export function getNotifys() {
  return get(`${API_PREFIX}message/getNotifys`);
}
