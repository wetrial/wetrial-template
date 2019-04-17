import globalHeader from './zh-CN/globalHeader';
import exception from './zh-CN/exception';
import menu from './zh-CN/menu';
import login from './zh-CN/login';
import settings from './zh-CN/settings';
import validation from './zh-CN/validation';


export default {
  'app.pwa.offline':'离线',
  'app.pwa.serviceworker.updated.ok':'确定',
  'app.pwa.serviceworker.updated':'温馨提示',
  'app.pwa.serviceworker.updated.hint':'系统有更新版本。。。',
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  ...menu,
  ...login,
  ...settings,
  ...exception,
  ...globalHeader,
  ...validation
};
