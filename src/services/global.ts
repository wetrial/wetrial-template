import {API_PREFIX} from '@/constants';
import { get } from '@/wetrial/request';

export function fetchQueryNotices() {
  return get(`${API_PREFIX}notices`);
}
