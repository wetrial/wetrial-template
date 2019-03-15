import {API_PREFIX} from '@/constants';
import { get } from '@/wetrial/request';

export async function fetchGetNotice() {
  return get(`${API_PREFIX}project/notice`);
}
