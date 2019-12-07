import React from 'react';
import { connect } from 'dva';
// import { formatMessage } from 'umi-plugin-react/locale';
import { IConnectProps } from '@wetrial/types';
import AvatarUser from './AvatarDropdown';
// import SelectLang from '../SelectLang';
import NoticeIconView from './NoticeIconView';

import styles from './index.less';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends IConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <NoticeIconView />
      <AvatarUser menu />
      {/* <SelectLang className={styles.action} /> */}
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
