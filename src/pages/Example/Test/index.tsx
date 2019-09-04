import React from 'react';
import { Card, Button } from 'antd';
import { PureComponent, AvatarList, FooterToolbar } from 'wetrial';

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
      <Card title="组件&功能实验页面">
        <AvatarList
          size="large"
          maxLength={3}
          excessItemsStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        >
          <AvatarList.Item
            tips="Jake"
            src="https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png"
          />
          <AvatarList.Item
            tips="Andy"
            src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
          />
          <AvatarList.Item
            tips="Niko"
            src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
          />
          <AvatarList.Item
            tips="Niko"
            src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
          />
          <AvatarList.Item
            tips="Niko"
            src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
          />
          <AvatarList.Item
            tips="Niko"
            src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
          />
        </AvatarList>
        <div style={{ background: '#f7f7f7', padding: 24 }}>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <FooterToolbar extra="extra information">
            <Button>Cancel</Button>
            <Button type="primary">Submit</Button>
          </FooterToolbar>
        </div>
      </Card>
    );
  }
}

export default Index;
