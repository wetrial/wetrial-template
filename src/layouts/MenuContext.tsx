import { createContext } from 'react';
import H from 'history';

export type TProviderStore={
  location: H.Location;
  breadcrumbNameMap: any[];
}

export default createContext({} as TProviderStore);
