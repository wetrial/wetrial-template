import NoticeIconTab, { NoticeIconTabProps } from './NoticeIconTab';
import NoticeList, { NoticeData } from './NoticeList';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Tabs, Badge, Spin } from 'antd';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const { TabPane } = Tabs;

export interface NoticeIconProps {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabName: string) => void;
  onItemClick?: (item: NoticeData, tabProps: NoticeIconTabProps) => void;
  onViewMore?: (tabProps: NoticeIconTabProps, e: MouseEvent) => void;
  onTabChange?: (tabTile: string) => void;
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  locale?: {
    emptyText: string;
    clear: string;
    viewMore: string;
    [key: string]: string;
  };
  clearClose?: boolean;
}

export default class NoticeIcon extends React.PureComponent<
  NoticeIconProps,
  any
> {
  static defaultProps = {
    // tslint:disable-next-line:no-empty
    onItemClick: () => {},
    // tslint:disable-next-line:no-empty
    onPopupVisibleChange: () => {},
    // tslint:disable-next-line:no-empty
    onTabChange: () => {},
    // tslint:disable-next-line:no-empty
    onClear: () => {},
    // tslint:disable-next-line:no-empty
    onViewMore: () => {},
    loading: false,
    clearClose: false,
    locale: {
      emptyText: '暂无信息',
      clear: '清空',
      viewMore: '更多',
    },
    emptyImage:
      'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
  };

  static Tab = NoticeIconTab;

  state = {
    visible: false,
  };

  private popover: HTMLElement;

  onItemClick = (item, tabProps) => {
    const { onItemClick } = this.props;
    const { clickClose } = item;
    onItemClick(item, tabProps);
    if (clickClose) {
      this.popover.click();
    }
  };

  onClear = name => {
    const { onClear, clearClose } = this.props;
    onClear(name);
    if (clearClose) {
      this.popover.click();
    }
  };

  onTabChange = tabType => {
    const { onTabChange } = this.props;
    onTabChange(tabType);
  };

  onViewMore = (tabProps, event) => {
    const { onViewMore } = this.props;
    onViewMore(tabProps, event);
  };

  getNotificationBox() {
    const { children, loading, locale } = this.props;

    if (!children) {
      return null;
    }
    const panes = React.Children.map(children as NoticeIconTab[], child => {
      const {
        list,
        title,
        count,
        emptyText,
        emptyImage,
        showClear,
        showViewMore,
      } = child.props;
      const len = list && list.length ? list.length : 0;
      const msgCount = count || count === 0 ? count : len;
      const localeTitle = locale[title] || title;
      const tabTitle =
        msgCount > 0 ? `${localeTitle} (${msgCount})` : localeTitle;
      return (
        <TabPane tab={tabTitle} key={title}>
          <NoticeList
            count={count}
            data={list}
            emptyImage={emptyImage}
            emptyText={emptyText}
            locale={locale}
            onClear={() => this.onClear(title)}
            onClick={item => this.onItemClick(item, child.props)}
            onViewMore={event => this.onViewMore(child.props, event)}
            showClear={showClear}
            showViewMore={showViewMore}
            title={title}
          />
        </TabPane>
      );
    });
    return (
      <Fragment>
        <Spin spinning={loading} delay={0}>
          <Tabs className={styles.tabs} onChange={this.onTabChange}>
            {panes}
          </Tabs>
        </Spin>
      </Fragment>
    );
  }

  handleVisibleChange = visible => {
    const { onPopupVisibleChange } = this.props;
    this.setState({ visible });
    onPopupVisibleChange(visible);
  };

  render() {
    const { className, count, bell } = this.props;
    const { visible } = this.state;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();
    const NoticeBellIcon = bell || <Icon type="bell" className={styles.icon} />;
    const trigger = (
      <span className={classNames(noticeButtonClass, { opened: visible })}>
        <Badge
          count={count}
          style={{ boxShadow: 'none' }}
          className={styles.badge}
        >
          {NoticeBellIcon}
        </Badge>
      </span>
    );
    if (!notificationBox) {
      return trigger;
    }
    return (
      <HeaderDropdown
        placement="bottomRight"
        overlay={notificationBox}
        overlayClassName={styles.popover}
        trigger={['click']}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        ref={node => (this.popover = ReactDOM.findDOMNode(node) as HTMLElement)} // eslint-disable-line
      >
        {trigger}
      </HeaderDropdown>
    );
  }
}
