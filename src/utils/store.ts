import storeWithExp from '@wetrial/core/es/store';

const Tenant = 'WETRIAL.Tenant';

export const getTenant = (): string | number => {
  return storeWithExp.get(Tenant);
};

export const setTenant = (tenantId): void => {
  storeWithExp.set(Tenant, tenantId);
};

export const clearTenant = (): void => {
  storeWithExp.remove(Tenant);
};

export { storeWithExp };
