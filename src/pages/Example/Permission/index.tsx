import React from 'react';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import { PureComponent } from 'wetrial';

@connect()
class Index extends PureComponent {
  togglePermissions = (isAdmin?: boolean) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/testToggleAuthorized',
      payload: {
        isAdmin,
      },
    });
  };

  render() {
    return (
      <Card title="权限测试">
        <Button type="danger" onClick={() => this.togglePermissions(true)}>
          设置为管理员权限
        </Button>
        <Button
          style={{ marginLeft: '5px' }}
          type="default"
          onClick={() => this.togglePermissions()}
        >
          设置为普通用户权限
        </Button>
      </Card>
    );
  }
}

export default Index;
