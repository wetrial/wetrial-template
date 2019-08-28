import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import NoticeIcon from '@/components/NoticeIcon';
import { IConnectProps } from '@wetrial/types';
import { ITipsModel, INoticeItem } from '@/models/global';
import styles from './index.less';

export interface INoticeIconViewProps extends IConnectProps {
  tips?: ITipsModel;
  getAlling?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
}

const notifyType = {
  todo: '待办',
  message: '消息',
  notify: '通知',
};

class NoticeIconView extends Component<INoticeIconViewProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/getAll',
        payload: {
          force: true,
        },
      });
    }
  }

  handleNoticeClear = (title: string, key: string) => {
    message.success(`${formatMessage({ id: 'component.noticeIcon.cleared' })} ${title} - ${key}`);
  };

  changeReadState = (clickedItem: INoticeItem): void => {
    const { id, type } = clickedItem;
    message.success(`标记 ${notifyType[type]}(${id})为已读`);
  };

  render() {
    const {
      getAlling,
      onNoticeVisibleChange,
      tips: { count, todos, messages, notifys },
    } = this.props;

    return (
      <NoticeIcon
        className={styles.action}
        count={count}
        onItemClick={item => {
          this.changeReadState(item as INoticeItem);
        }}
        loading={getAlling}
        clearText={formatMessage({ id: 'component.noticeIcon.clear' })}
        viewMoreText={formatMessage({ id: 'component.noticeIcon.view-more' })}
        onClear={this.handleNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        onViewMore={() => message.info('点击查看更多')}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="notification"
          count={notifys.count}
          list={notifys.list}
          title={formatMessage({ id: 'component.globalHeader.notification' })}
          emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="event"
          title={formatMessage({ id: 'component.globalHeader.event' })}
          emptyText={formatMessage({ id: 'component.globalHeader.event.empty' })}
          count={todos.count}
          list={todos.list}
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="message"
          count={messages.count}
          list={messages.list}
          title={formatMessage({ id: 'component.globalHeader.message' })}
          emptyText={formatMessage({ id: 'component.globalHeader.message.empty' })}
          showViewMore
        />
      </NoticeIcon>
    );
  }
}

export default connect(({ global, loading }) => ({
  collapsed: global.collapsed,
  getAlling: loading.effects['global/getAll'],
  tips: global.tips,
}))(NoticeIconView);
