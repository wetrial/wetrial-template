import React from 'react';
import { Avatar, List } from 'antd';
import classNames from 'classnames';
import styles from './NoticeList.less';

export interface NoticeData {
  avatar?: string | React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface NoticeListProps {
  count?: number;
  emptyText?: string | React.ReactNode;
  emptyImage?: string;
  list?: NoticeData[];
  name?: string;
  showClear?: boolean;
  showViewMore?: boolean;
  style?: React.CSSProperties;
  title?: string;
  data?: any[];
  onClick: (item: any) => void;
  onClear: (item: any) => void;
  locale?: {
    emptyText: string;
    clear: string;
    viewMore: string;
    [key: string]: string;
  };
  onViewMore: (e: any) => void;
}

export default class NoticeList extends React.Component<NoticeListProps, any> {
  static defaultProps = {
    showClear: true,
    showViewMore: false,
    locale: {
      emptyText: '暂无数据',
      clear: '清空',
      viewMore: '加载更多',
    },
  };

  render() {
    const {
      title,
      showViewMore,
      data,
      emptyImage,
      emptyText,
      locale,
      showClear,
      onClear,
      onClick,
      onViewMore,
    } = this.props;
    if (data.length === 0) {
      return (
        <div className={styles.notFound}>
          {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
          <div>{emptyText || locale.emptyText}</div>
        </div>
      );
    }
    return (
      <div>
        <List
          className={styles.list}
          dataSource={data}
          renderItem={item => {
            const itemCls = classNames(styles.item, {
              [styles.read]: item.read,
            });
            // eslint-disable-next-line no-nested-ternary
            const leftIcon = item.avatar ? (
              typeof item.avatar === 'string' ? (
                <Avatar className={styles.avatar} src={item.avatar} />
              ) : (
                <span className={styles.iconElement}>{item.avatar}</span>
              )
            ) : null;

            return (
              <List.Item className={itemCls} onClick={() => onClick(item)}>
                <List.Item.Meta
                  className={styles.meta}
                  avatar={leftIcon}
                  title={
                    <div className={styles.title}>
                      {item.title}
                      <div className={styles.extra}>{item.extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div
                        className={styles.description}
                        title={item.description}
                      >
                        {item.description}
                      </div>
                      <div className={styles.datetime}>{item.datetime}</div>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
        <div className={styles.bottomBar}>
          {showClear ? (
            <div onClick={onClear}>
              {locale.clear} {locale[title] || title}
            </div>
          ) : null}
          {showViewMore ? (
            <div onClick={onViewMore}>{locale.viewMore}</div>
          ) : null}
        </div>
      </div>
    );
  }
}
