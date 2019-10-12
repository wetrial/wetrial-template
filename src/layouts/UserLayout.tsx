import React, { Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
// import SelectLang from '@/components/SelectLang';
import { GlobalFooter } from 'wetrial';
import { IConnectProps, IMenuDataItem } from '@wetrial/types';
import { getPageTitle, getMenuData } from '@wetrial/components/NormalLayout';
import defaultSettings from '@config/defaultSettings';
import styles from './UserLayout.less';

export interface UserLayoutProps extends IConnectProps {
  breadcrumbNameMap: { [path: string]: IMenuDataItem };
}

const UserLayout: React.SFC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);

  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        title: defaultSettings.title,
        ...props,
      })}
    >
      <div className={styles.container}>
        {/* <div className={styles.lang}>
          <SelectLang />
        </div> */}
        <div className={styles.content}>{children}</div>
        <GlobalFooter
          copyright={
            <Fragment>
              Copyright <Icon type="copyright" />
              2019 湖南微试云技术部出品
            </Fragment>
          }
        />
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }) => ({
  settings,
}))(UserLayout);
