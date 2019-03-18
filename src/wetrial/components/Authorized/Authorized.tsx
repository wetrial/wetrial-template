import React from 'react';
import CheckPermissions from './CheckPermissions';
import { TAuthority } from './type';

export interface IAuthorizedProps {
  authority: TAuthority;
  noMatch?: React.ReactNode;
}

class Authorized extends React.PureComponent<IAuthorizedProps> {
  render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
