import React from 'react';
import { connect } from 'dva';
import { IConnectProps, IConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends IConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

// const ENVTagColor = {
//   dev: 'orange',
//   test: 'green',
//   pre: '#87d068',
// };

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Avatar />
    </div>
  );
};

export default connect(({ settings }: IConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
