import Authorized from './Authorized';
import renderAuthorize from './renderAuthorize';
import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import CheckPermissions from './CheckPermissions';

class CombineAuthorized extends Authorized {
  static AuthorizedRoute = AuthorizedRoute;
  static Secured = Secured;
  static check = CheckPermissions;
}

export default renderAuthorize(CombineAuthorized);
