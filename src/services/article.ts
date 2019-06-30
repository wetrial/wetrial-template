import { API_PREFIX } from '@/constants';
import { get } from 'wetrial/request';

export async function fetchList() {
  return get(`${API_PREFIX}article/list`);
}
