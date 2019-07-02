export type TTags = {
  label: string;
  key: string;
};

export interface ICurrentUser {
  name: string;
  realName: string;
  unreadCount: number;
  avatar: string;
  email: string;
  phone: string;
  signature: string;
  title: string;
  group: string;
  tags: TTags[];
}
