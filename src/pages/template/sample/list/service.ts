import { get, put, post, del } from '@/utils/request';
import { API_PREFIX } from '@/constants';

export async function getList(data) {
  return get(`${API_PREFIX}template/list/getList`, {
    data,
  });
}

export async function getItem(data) {
  return get(`${API_PREFIX}template/list/getItem`, {
    data,
  });
}

export async function create(data) {
  return post(`${API_PREFIX}template/list`, {
    data,
  });
}

export async function update(data) {
  return put(`${API_PREFIX}template/list`, {
    data,
  });
}

export async function remove(data) {
  return del(`${API_PREFIX}template/list`, {
    data,
  });
}
