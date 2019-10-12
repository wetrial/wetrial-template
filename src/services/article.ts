import { get } from '@/utils/request';
import { API_PREFIX } from '@/constants';

export async function fetchList() {
  return get(`${API_PREFIX}article/list`);
}
