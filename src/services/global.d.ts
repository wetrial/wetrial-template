import { Settings as ProSettings } from '@ant-design/pro-layout';

export interface IUserProps {
  name: string;
  avatar: string;
  id: string;
  email: string;
  unreadCount: string;
  phone: string;
  permissions: string[];
}

export interface IGlobalProps {
  currentUser?: IUserProps;
  settings?: ProSettings;
}
