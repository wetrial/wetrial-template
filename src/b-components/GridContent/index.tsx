import {IPageHeaderProps} from '@/wetrial/types';

import React from 'react';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { connect } from 'dva';
import MenuContext from '@/layouts/MenuContext';
import {PageHeader,PureComponent} from '@/wetrial';
import GridContent from './GridContent';
import styles from './index.less';

export interface PageHeaderGridContentProps extends IPageHeaderProps {
  wrapperClassName?: string;
  top?: React.ReactNode;
  contentWidth?: string;
}

@connect(({ setting }) => ({
  contentWidth: setting.contentWidth
}))
class PageHeaderGridContent extends PureComponent<PageHeaderGridContentProps, any> {
  render() {
    const {
      wrapperClassName,
      top,
      contentWidth,
      children,
      ...rest
    } = this.props;

    return (
      <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
        {top}
        <MenuContext.Consumer>
          {(value) => (
            <PageHeader
              wide={contentWidth === 'Fixed'}
              home={<FormattedMessage id="menu.home" defaultMessage="Home" />}
              {...value}
              key="pageHeader"
              {...rest}
              linkElement={Link}
              itemRender={(item) => {
                if (item.locale) {
                  return (
                    <FormattedMessage
                      id={item.locale}
                      defaultMessage={item.title}
                    />
                  );
                }
                return item.title;
              }}
            />
          )}
        </MenuContext.Consumer>
        {children ? (
          <div className={styles.content}>
            <GridContent>{children}</GridContent>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PageHeaderGridContent;
