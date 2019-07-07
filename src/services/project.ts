import { get } from '@wetrial/request';
import { API_PREFIX } from '@/constants';


export async function fetchGetNotice() {
  return get(`${API_PREFIX}project/notice`);
}
