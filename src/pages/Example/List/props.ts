import { IConnectProps, IFormProps, IKeyValue } from '@wetrial/types';
import { IWithPagedQueryProps } from '@wetrial/components/withPagedQuery';

export interface IListProps extends IConnectProps, IWithPagedQueryProps {
  // [key: string]: any;
}

export interface IListStates {}

export interface IViewProps extends IFormProps {
  onClose: {
    (result: boolean): void;
  };
  id: string;
  model: IKeyValue;
}
