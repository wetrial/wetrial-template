
import { SelectParam } from 'antd/es/menu';
import { ICurrentUser } from '@/types/user';
import {NoticeData} from '../NoticeIcon/NoticeList';
import NoticeIcon, { NoticeIconProps } from '../NoticeIcon';
import { HeaderSearchProps } from '../HeaderSearch';

import React from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Dropdown, Avatar, Menu, Icon, Spin, message } from 'antd';

import styles from './index.less';

export interface RightContextProps extends NoticeIconProps{
  todos:{
    count:number;
    list:NoticeData[]
  };
  notifys:{
    count:number;
    list:NoticeData[]
  };
  messages:{
    count:number;
    list:NoticeData[]
  };
}

export interface GlobalHeaderRightProps {
  currentUser?: ICurrentUser;
  onMenuClick?: (params: SelectParam) => void;
  headerSearch?: boolean | HeaderSearchProps;
  noticeIcon?: false | RightContextProps;
}

export default class RightContext extends React.PureComponent<GlobalHeaderRightProps,any> {
  getNoticeDom = () => {
    const { noticeIcon } = this.props;
    if (!noticeIcon) {
      return null;
    } else {
      const {
        onItemClick,
        onClear,
        onPopupVisibleChange,
        loading,
        count,
        todos,
        notifys,
        messages
      } = noticeIcon;
      return (
        <NoticeIcon
          className={styles.action}
          count={count}
          loading={loading}
          locale={{
            emptyText: formatMessage({ id: 'component.noticeIcon.empty' }),
            clear: formatMessage({ id: 'component.noticeIcon.clear' }),
            viewMore: formatMessage({ id: 'component.noticeIcon.view-more' }),
            notification: formatMessage({ id: 'component.globalHeader.notification' }),
            message: formatMessage({ id: 'component.globalHeader.message' }),
            todo: formatMessage({ id: 'component.globalHeader.todo' }),
          }}
          onItemClick={onItemClick}
          onClear={onClear}
          onPopupVisibleChange={onPopupVisibleChange}
          onViewMore={() => message.info('点击查看更多')}
          clearClose={true}
        >
          <NoticeIcon.Tab
            count={notifys.count}
            list={notifys.list}
            title="notification"
            emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            showViewMore
          />
          <NoticeIcon.Tab
            count={messages.count}
            list={messages.list}
            title="message"
            emptyText={formatMessage({ id: 'component.globalHeader.message.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            showViewMore
          />
          <NoticeIcon.Tab
            count={todos.count}
            list={todos.list}
            title="todo"
            emptyText={formatMessage({ id: 'component.globalHeader.todo.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            showViewMore
            showClear={false}
          />
        </NoticeIcon>
      );
    }
  };
  render() {
    const { onMenuClick, currentUser } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.right}>
        {/** 消息通知 */}
        {this.getNoticeDom()}

        {currentUser.name ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.name}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        {/** 选择语言 */}
        {/* <SelectLang className={styles.action} /> */}
      </div>
    );
  }
}
