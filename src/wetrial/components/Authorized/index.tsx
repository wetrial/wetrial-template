import Authorized from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';

const MergeAuthorized: any = Authorized;
MergeAuthorized.Secured = Secured;
MergeAuthorized.AuthorizedRoute = AuthorizedRoute;
MergeAuthorized.check = check;

export default renderAuthorize(MergeAuthorized);
