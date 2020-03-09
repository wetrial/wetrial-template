import { setPermissions as wtSetPermissions } from '@wetrial/core/authority';
import { reloadAuthorized } from './Authorized';

export function setPermissions(authority: string | string[]): void {
  wtSetPermissions(authority);
  reloadAuthorized();
}

export {
  getPermissions,
  getToken,
  setToken,
  clearPermissions,
  clearToken,
} from '@wetrial/core/authority';
