export type TagType = {
  key: string;
  label: string;
};

export interface ICurrentUserType {
  name: string;
  realName: string;
  unreadCount: number;
  avatar: string;
  email: string;
  phone: string;
  signature: string;
  title: string;
  group: string;
  tags: TagType[];
}
