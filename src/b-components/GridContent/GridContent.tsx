import React,{PureComponent} from 'react';
import { connect } from 'dva';
import styles from './GridContent.less';

export interface GridContentProps {
  contentWidth?: string;
  children: React.ReactNode;
}

@connect(({ setting }) => ({
  contentWidth: setting.contentWidth
}))
class GridContent extends PureComponent<GridContentProps, any> {
  render() {
    const { contentWidth, children } = this.props;
    let className = `${styles.main}`;
    if (contentWidth === 'Fixed') {
      className = `${styles.main} ${styles.wide}`;
    }
    return <div className={className}>{children}</div>;
  }
}

export default GridContent;
