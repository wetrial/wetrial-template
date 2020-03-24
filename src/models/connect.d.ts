import { AnyAction } from 'redux';
import * as H from 'history';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { IGlobalModelState } from './global';
import { DefaultSettings as ISettingModelState } from '../../config/defaultSettings';
import { IAccountModelState } from './account';

export { IGlobalModelState, ISettingModelState, IAccountModelState };

export interface ILoading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface IConnectState {
  global: IGlobalModelState;
  loading: ILoading;
  settings: ISettingModelState;
  account: IAccountModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface IConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
  route: {
    routes?: Route[];
  };
  location: H.Location;
}
