import React from 'react';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import { PureComponent } from 'wetrial';
import WetrialPermissions from '@config/permissions';
import { deepGetValue } from '@/utils';
import { setPermissions } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

@connect()
class Index extends PureComponent {
  setAdmin = () => {
    const permissions = deepGetValue(WetrialPermissions) as string[];
    setPermissions(permissions);
    reloadAuthorized();
    this.reloadMenu();
  };
  setNormalUser = () => {
    const copyWetrialPermissions = JSON.parse(
      JSON.stringify(WetrialPermissions),
    );
    delete copyWetrialPermissions.example.reactDnd;
    const permissions = deepGetValue(copyWetrialPermissions) as string[];
    setPermissions(permissions);
    reloadAuthorized();
    this.reloadMenu();
  };

  reloadMenu = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/reloadMenu',
    });
  };

  render() {
    return (
      <Card title="权限测试">
        <Button type="danger" onClick={this.setAdmin}>
          设置为管理员权限
        </Button>
        <Button type="default" onClick={this.setNormalUser}>
          设置为普通用户权限
        </Button>
      </Card>
    );
  }
}

export default Index;
