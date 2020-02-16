import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import { IConnectState, IConnectProps } from '@/models/connect';
import { ICurrentUser } from '@/models/account';
import { getToken } from '@/utils/authority';

interface SecurityLayoutProps extends IConnectProps {
  loading?: boolean;
  currentUser?: ICurrentUser;
}

class SecurityLayout extends React.Component<SecurityLayoutProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'account/getCurrentUser',
      });
    }
  }

  render() {
    const { children, loading, currentUser } = this.props;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if (getToken()) {
      if (loading || !currentUser?.id) {
        return <PageLoading />;
      }

      return children;
    }
    return <Redirect to={`/account/login?${queryString}`} />;
  }
}

export default connect(({ account, loading }: IConnectState) => ({
  currentUser: account.currentUser,
  loading: loading.effects['account/getCurrentUser'],
}))(SecurityLayout);
