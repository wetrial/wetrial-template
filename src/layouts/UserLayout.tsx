import React from 'react';
import { NormalLayout } from 'wetrial';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';

const {DefaultFooter}=NormalLayout;

class UserLayout extends React.PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>

        <div className={styles.content}>{children}</div>
        <DefaultFooter />
      </div>
    );
  }
}

export default UserLayout;
