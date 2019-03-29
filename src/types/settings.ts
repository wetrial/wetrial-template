type MenuTheme = 'light' | 'dark';
type layoutType = 'sidemenu' | 'topmenu';
type contentWidthType = 'Fluid' | 'Fixed';
type menuType={
  disableLocal:boolean
}

export interface ISettingsModelState {
  navTheme: MenuTheme;
  primaryColor?:string;
  layout: layoutType;
  contentWidth: contentWidthType;
  fixedHeader: boolean;
  autoHideHeader: boolean;
  fixSiderbar: boolean;
  menu:menuType;
  title?:string;
  pwa?:boolean;
  collapse?:boolean;
  iconFontUrl?:string;
}
