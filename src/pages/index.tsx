import React, { PureComponent } from 'react';
import { Button, Card } from 'antd';
import {Link}  from "umi";
import styles from './index.less';

class Index extends PureComponent {
  state = {
    show: false,
  };

  render() {
    const { show } = this.state;
    return (
      <div className={styles.header}>
      <Card>
        <Button
          onClick={() => {
            this.setState({
              show: !show,
            });
          }}
        >
          Toggle
        </Button>
      </Card>
      <Link to="/demos">Go to list page</Link>
      <div>test</div><div>test</div><div>test</div><div>test</div><div>test</div><div>test</div>
    </div>
    );
  }
}

export default Index;
