import { API_PREFIX } from '@/constants';
import { del, get, post, put } from '@/utils/request';

export async function getList(data) {
  return await get(`${API_PREFIX}template/list/getList`, {
    data,
  });
}

export async function getItem(data) {
  return await get(`${API_PREFIX}template/list/getItem`, {
    data,
  });
}

export async function create(data) {
  return await post(`${API_PREFIX}template/list`, {
    data,
  });
}

export async function update(data) {
  return await put(`${API_PREFIX}template/list`, {
    data,
  });
}

export async function remove(data) {
  return await del(`${API_PREFIX}template/list`, {
    data,
  });
}
