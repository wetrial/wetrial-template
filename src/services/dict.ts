import { API_PREFIX } from '@/constants';
import { get } from '@/utils/request';

export async function getCountrys() {
  return get(`${API_PREFIX}dict/getCountrys`);
}
