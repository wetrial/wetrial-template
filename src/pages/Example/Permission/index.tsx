import React from 'react';
import { Card, PageHeader, Tag, Button } from 'antd';
import { connect } from 'dva';
import { PureComponent } from 'wetrial';
import { RouteContext } from '@wetrial/components/NormalLayout';

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
      <RouteContext.Consumer>
        {value => {
          return (
            <PageHeader
              breadcrumb={value.breadcrumb}
              title="Title"
              subTitle="This is a subtitle"
              tags={<Tag color="blue">Running</Tag>}
              extra={[
                <Button key="3">Operation</Button>,
                <Button key="2">Operation</Button>,
                <Button key="1" type="primary">
                  Primary
                </Button>,
              ]}
              avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
            >
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
            </PageHeader>
          );
        }}
      </RouteContext.Consumer>
    );
  }
}

export default Index;
