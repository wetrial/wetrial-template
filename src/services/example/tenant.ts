import { API_PREFIX } from '@/constants';
import { get } from 'wetrial/request';

export function GetTenants(data) {
  return get({
    url: `${API_PREFIX}Tenant/GetTenants`,
    data,
  });
}

export function GetTenant(data) {
  return get({
    url: `${API_PREFIX}Tenant/GetTenant`,
    data,
  });
}
