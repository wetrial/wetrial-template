import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import React from 'react';
import { ConfigProvider } from 'antd';
import validateMessages from '@wetrial/core/validation';
// import SelectLang from '@/components/SelectLang';
import { IConnectProps } from '@/models/connect';
import styles from './UserLayout.less';

export interface UserLayoutProps extends IConnectProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
    location,
  } = props;
  const { routes = [] } = route;
  const { children } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage: undefined,
    breadcrumb,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <ConfigProvider form={{ validateMessages }}>{children}</ConfigProvider>;
        </div>
        <DefaultFooter links={[]} copyright="Copyright 2020 湖南微试云" />
      </div>
    </>
  );
};

export default UserLayout;
