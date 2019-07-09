import { MenuTheme } from 'antd/es/menu';
import theme from '../config/theme.config';

export type ContentWidth = 'Fluid' | 'Fixed';

export interface Settings {
  /**
   * theme for nav menu
   */
  navTheme:MenuTheme;
  primaryColor?:string,
  /**
   * nav menu position: `sidemenu` or `topmenu`
   */
  layout: 'sidemenu' | 'topmenu';
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
   */
  contentWidth: ContentWidth;
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * auto hide header
   */
  autoHideHeader: boolean;
  /**
   * sticky siderbar
   */
  fixSiderbar: boolean;
  menu: { locale: boolean };
  pwa?:boolean;
  collapse?:boolean;
  title: string;
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: string;
}


const defaultSettings:Settings= {
    navTheme: "light",
    primaryColor:theme['@primary-color'],
    layout:"sidemenu",
    contentWidth: "Fluid",
    fixedHeader: true,
    autoHideHeader: true,
    fixSiderbar: true,
    menu: {
        locale: false
    },
    title: "Wetrial",
    pwa: false,
    collapse: false,
    iconfontUrl: "//at.alicdn.com/t/font_1077466_58oq1vbr6wi.js" // iconfont库地址 
}

export default defaultSettings;