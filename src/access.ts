import type { IGlobalProps } from '@/services/global.d';
import { Permissions } from '@config/routes';
import type { TKeyValue } from '@wetrial/core';

export default (initialState: IGlobalProps = {}) => {
  const { currentUser } = initialState;
  const allPermissions = {
    ...Permissions,
  };
  return dgFlatPermissions(allPermissions, currentUser?.permissions);
};

function dgFlatPermissions(
  allPermissions: TKeyValue,
  curPermissions: string[] = [],
): TKeyValue<boolean> {
  let result: TKeyValue<boolean> = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in allPermissions) {
    if (allPermissions.hasOwnProperty(key)) {
      if (typeof allPermissions[key] === 'string') {
        result[allPermissions[key]] = curPermissions.indexOf(allPermissions[key]) !== -1;
      } else {
        const subResult = dgFlatPermissions(allPermissions[key], curPermissions);
        result = {
          ...result,
          ...subResult,
        };
      }
    }
  }
  return result;
}
