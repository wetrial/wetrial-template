import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const defaultSetting:LayoutSettings& {
  pwa?: boolean;
  logo?: string;
} ={
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Wetrial',
  logo:'/logo.png',
  pwa:false,
  iconfontUrl: '//at.alicdn.com/t/font_733142_yrrqxd7u55.js', // iconfont在线图库地址，需要图片请联系前端添加
}

export default defaultSetting;
