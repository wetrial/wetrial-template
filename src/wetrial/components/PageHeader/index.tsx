import Breadcrumb,{BreadcrumbProps} from '../Breadcrumb';

import React,{PureComponent} from 'react';
import classNames from 'classnames';
import { Tabs, Skeleton } from 'antd';

import styles from './index.less';

const { TabPane } = Tabs;

export interface IPageHeaderProps extends BreadcrumbProps{
  title?: React.ReactNode | string | number;
  logo?: React.ReactNode | string;
  action?: React.ReactNode | string;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;  
  tabList?: Array<{ key: string; tab: React.ReactNode }>;
  tabActiveKey?: string;
  tabDefaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  tabBarExtraContent?: React.ReactNode;
  style?: React.CSSProperties;
  wide?: boolean;
  hiddenBreadcrumb?: boolean;
  className?: string;
  loading?: boolean;
}

export default class PageHeader extends PureComponent<IPageHeaderProps, any> {
  onChange = key => {
    const { onTabChange } = this.props;
    if (onTabChange) {
      onTabChange(key);
    }
  };

  render() {
    const {
      title = '',
      logo,
      action,
      content,
      extraContent,
      tabList,
      className,
      tabActiveKey,
      tabDefaultActiveKey,
      tabBarExtraContent,
      loading = false,
      wide = false,
      hiddenBreadcrumb = false,
    } = this.props;

    const clsString = classNames(styles.pageHeader, className);
    const activeKeyProps = {
      defaultActiveKey:undefined,
      activeKey:undefined
    };
    if (tabDefaultActiveKey !== undefined) {
      activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
    }
    if (tabActiveKey !== undefined) {
      activeKeyProps.activeKey = tabActiveKey;
    }
    return (
      <div className={clsString}>
        <div className={wide ? styles.wide : ''}>
          <Skeleton
            loading={loading}
            title={false}
            active
            paragraph={{ rows: 3 }}
            avatar={{ size: 'large', shape: 'circle' }}
          >
            {hiddenBreadcrumb ? null : <Breadcrumb {...this.props} />}
            <div className={styles.detail}>
              {logo && <div className={styles.logo}>{logo}</div>}
              <div className={styles.main}>
                <div className={styles.row}>
                  <h1 className={styles.title}>{title}</h1>
                  {action && <div className={styles.action}>{action}</div>}
                </div>
                <div className={styles.row}>
                  {content && <div className={styles.content}>{content}</div>}
                  {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
                </div>
              </div>
            </div>
            {tabList && tabList.length ? (
              <Tabs
                className={styles.tabs}
                {...activeKeyProps}
                onChange={this.onChange}
                tabBarExtraContent={tabBarExtraContent}
              >
                {tabList.map(item => (
                  <TabPane tab={item.tab} key={item.key} />
                ))}
              </Tabs>
            ) : null}
          </Skeleton>
        </div>
      </div>
    );
  }
}
