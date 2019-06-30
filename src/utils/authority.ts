import {
  getPermissions as storeGetPermissions,
  setPermissions as storeSetPermissions,
  clearPermissions as storeClearPermissions,
} from './store';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getPermissions(str?: string) {
  const permissionString =
    typeof str === 'undefined' ? storeGetPermissions() : str;
  let permission;
  try {
    permission = JSON.parse(permissionString as string);
  } catch (e) {
    permission = permissionString;
  }
  if (typeof permission === 'string') {
    return [permission];
  }
  return permission;
}

export function setPermissions(permissions?: string | string[]) {
  const tempPermissions =
    typeof permissions === 'string' ? [permissions] : permissions;
  return storeSetPermissions(tempPermissions);
}

export function clearPermissions() {
  return storeClearPermissions();
}
