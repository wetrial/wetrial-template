import React, { Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import Link from 'umi/link';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
// import SelectLang from '@/components/SelectLang';
import { GlobalFooter } from 'wetrial'
import { ConnectProps, MenuDataItem } from '@wetrial/types'
import { getPageTitle, getMenuData } from '@wetrial/components/NormalLayout'
import styles from './UserLayout.less';
import logo from '@/assets/logo.jpg';


export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
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
        ...props,
      })}
    >
      <div className={styles.container}>
        {/* <div className={styles.lang}>
          <SelectLang />
        </div> */}
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Ant Design</span>
              </Link>
            </div>
            <div className={styles.desc}>2019 湖南微试云技术部出品</div>
          </div>
          {children}
        </div>
        <GlobalFooter
          copyright={
            <Fragment>
              Copyright <Icon type="copyright" />2019 湖南微试云技术部出品
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