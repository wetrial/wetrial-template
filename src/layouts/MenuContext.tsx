import { createContext } from 'react';
import H from 'history';

export type TProviderStore={
  location: H.Location;
  breadcrumbNameMap:{[key:string]:Object};
}

export default createContext({} as TProviderStore);
