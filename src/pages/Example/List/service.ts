import { get } from '@wetrial/request';
import { API_PREFIX } from '@/constants';

export async function GetTenants(data): Promise<any> {
  return get({
    url: `${API_PREFIX}Tenant/GetTenants`,
    data,
  });
}

export async function GetTenant(data): Promise<any> {
  return get({
    url: `${API_PREFIX}Tenant/GetTenant`,
    data,
  });
}
