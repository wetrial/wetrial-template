import React from 'react';
import { Redirect } from 'umi';
import { RouteProps, Route } from 'react-router';
import Authorized from './Authorized';
import { TAuthority } from './type';

interface IAuthorizedRouteProps extends RouteProps {
  authority: TAuthority;
  render?: any;
  component?: any;
  redirectPath?: string;
}

// TODO: umi只会返回render和rest
class AuthorizedRoute extends React.Component<IAuthorizedRouteProps, any> {
  render() {
    const { authority, component: Component, redirectPath, render, ...rest } = this.props;
    return (
      <Authorized
        authority={authority}
        noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
      >
        <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
      </Authorized>
    );
  }
}

export default AuthorizedRoute;
