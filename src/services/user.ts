import {API_PREFIX} from '@/constants';
import { get } from '@/wetrial/request';

export function fetchCurrentUser() {
  return get(`${API_PREFIX}user/current`);
}