import {API_PREFIX} from '@/constants';
import { get } from '@/wetrial/request';

export function fetchCurrentUser() {
  return get(`${API_PREFIX}user/current`);
}

export function fetchPage(data){
  return get({
    url:`${API_PREFIX}user/getPaged`,
    data
  });
}