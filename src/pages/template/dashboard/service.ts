import { get } from '@/utils/request';
import { API_PREFIX } from '@/constants';

export async function GetTenants(data) {
  return get({
    url: `${API_PREFIX}Tenant/GetTenants`,
    data,
  });
}

export async function GetTenant(data) {
  return get({
    url: `${API_PREFIX}Tenant/GetTenant`,
    data,
  });
}
