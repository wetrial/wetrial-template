import React from 'react';
import {NoticeData} from './NoticeList';

export interface NoticeIconTabProps {
  count?: number;
  emptyText?: React.ReactNode;
  emptyImage?: string;
  list?: NoticeData[];
  name?: string;
  showClear?: boolean;
  showViewMore?: boolean;
  style?: React.CSSProperties;
  title?: string;
  data?: any[];
  locale?: any;
}

export default class NoticeIconTab extends React.PureComponent<NoticeIconTabProps, any>{}