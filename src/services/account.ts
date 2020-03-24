import { API_PREFIX } from '@/constants';
import { get, post } from '@/utils/request';

export async function getCurrentUser() {
  return get(`${API_PREFIX}account/getCurrentUser`);
}

export async function login(data) {
  return post(`${API_PREFIX}account/login`, {
    data,
    successTip: false,
  });
}

export async function register(data) {
  return post(`${API_PREFIX}account/register`, {
    data,
    successTip: false,
  });
}
