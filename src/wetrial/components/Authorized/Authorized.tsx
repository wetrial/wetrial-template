import { TAuthority } from './type';
import React from 'react';
import CheckPermissions from './CheckPermissions';

export interface IAuthorizedProps {
  authority: TAuthority;
  noMatch?: React.ReactNode;
}

class Authorized extends React.PureComponent<IAuthorizedProps> {
  static check;
  static Secured;
  static AuthorizedRoute;

  render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
