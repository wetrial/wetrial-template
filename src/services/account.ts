import { API_PREFIX } from '@/constants';
import { get, post } from '@/utils/request';

export async function getCurrentUser() {
  return get(`${API_PREFIX}account/getCurrentUser`);
}

export async function login(data) {
  return post({
    url: `${API_PREFIX}account/login`,
    data,
  });
}

export async function register(data) {
  return post({
    url: `${API_PREFIX}account/register`,
    data,
  });
}
