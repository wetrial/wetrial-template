import { API_PREFIX } from '@/constants';
import { post } from '@/utils/request';

export async function login(data) {
  return await post(`${API_PREFIX}auth/token`, {
    data,
    successTip: false,
  });
}

export async function register(data) {
  return await post(`${API_PREFIX}account/register`, {
    data,
    successTip: false,
  });
}
