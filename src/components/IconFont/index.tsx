import { Icon } from 'antd';
import defaultSettings from '@config/defaultSettings';

// 使用：
// import IconFont from '@/components/IconFont';
// <IconFont type='icon-demo' className='xxx-xxx' />
export default Icon.createFromIconfontCN({
  scriptUrl: defaultSettings.iconFontUrl,
});
