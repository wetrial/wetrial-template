import { API_PREFIX } from '@/constants';
import { get } from '@/utils/request';

export async function getMessages() {
  return get(`${API_PREFIX}message/getAll`);
}
