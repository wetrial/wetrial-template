import { Authorized as RenderAuthorize } from '@wetrial/component';
import { getPermissions } from './authority';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorize(getPermissions());

// Reload the rights component
const reloadAuthorized = (): void => {
  Authorized = RenderAuthorize(getPermissions());
};

/**
 * hard code
 * block need it。
 */
window.reloadAuthorized = reloadAuthorized;

export { reloadAuthorized };
export default Authorized;
