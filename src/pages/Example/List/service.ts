import { get } from '@wetrial/request';
import { API_PREFIX } from '@/constants';

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
