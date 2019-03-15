export type TReactComponent<P = any> =
  | React.StatelessComponent<P>
  | React.ComponentClass<P>
  | React.ReactElement<P>
  | React.ReactNode
  | React.ClassicComponentClass<P>;

export type TAuthorityFN = (currentAuthority?: string | string[]) => boolean;

export type TAuthority = string | string[] | TAuthorityFN | Promise<any>;
