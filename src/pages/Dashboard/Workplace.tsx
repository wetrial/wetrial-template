import { ICurrentUser } from '@/types/user';

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Link} from 'umi';
import { Row, Col, Card, Avatar } from 'antd';
import GridContent from '@/b-components/GridContent'
import styles from './Workplace.less';

interface Workplace {
  currentUser: ICurrentUser,
  currentUserLoading: boolean,
  projectLoading:boolean
}

@connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/getCurrent']
}))
class Workplace extends PureComponent<Workplace, any> {
  render() {
    const { currentUserLoading, currentUser,projectLoading } = this.props;
    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              早安，
            {currentUser.name}
              ，祝你开心每一天！
          </div>
            <div>
              {currentUser.title} |{currentUser.group}
            </div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排名</p>
          <p>
            8<span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>项目访问</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <GridContent
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              test
            </Card>
            
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              ddd
            </Card>
            
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Workplace;
