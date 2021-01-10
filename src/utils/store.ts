import { store } from '@wetrial/core';

const Tenant = 'WETRIAL.Tenant';

export const getTenant = (): string | number => {
  return store.get(Tenant);
};

export const setTenant = (tenantId): void => {
  store.set(Tenant, tenantId);
};

export const clearTenant = (): void => {
  store.remove(Tenant);
};

export { store };
