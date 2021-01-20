import type { Settings as ProSettings } from '@ant-design/pro-layout';

export type IUser = {
  name: string;
  avatar: string;
  id: string;
  email: string;
  unreadCount: number;
  phone: string;
  permissions: string[];
};

export type IGlobalProps = {
  currentUser?: IUser;
  settings?: ProSettings;
};
