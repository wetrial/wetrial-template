import { Authorized as RenderAuthorized } from '@wetrial/core';
import { getPermissions } from './authority';

let Authorized = RenderAuthorized(getPermissions()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = (): void => {
  Authorized = RenderAuthorized(getPermissions());
};

export { reloadAuthorized };
export default Authorized;
