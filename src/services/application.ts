import { get } from 'wetrial/request';
import { API_PREFIX } from '@/constants';


export async function fetchList() {
  return get(`${API_PREFIX}application/list`);
}
