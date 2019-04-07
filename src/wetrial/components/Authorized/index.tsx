import renderAuthorize from './renderAuthorize';
import Authorized from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import CheckPermissions from './CheckPermissions';

Authorized.check = CheckPermissions;
Authorized.Secured = Secured;
Authorized.AuthorizedRoute = AuthorizedRoute;

export default renderAuthorize(Authorized);
