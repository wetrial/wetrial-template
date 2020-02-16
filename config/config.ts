import { IConfig, IPlugin } from 'umi-types';
import { join } from 'path';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
// import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import themeConfig from './theme.config';
import routes from './routes';
import chinaWebpack from './plugin.chinaWebpack';

const { pwa } = defaultSettings;

const { REACT_APP_ENV = 'dev' } = process.env;
const plugins: IPlugin[] = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: false,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
      // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  // [
  //   'umi-plugin-pro-block',
  //   {
  //     moveMock: false,
  //     moveService: false,
  //     modifyRequest: true,
  //     autoAddMenu: true,
  //   },
  // ],
  //['umi-plugin-antd-theme', themePluginConfig]
];

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: themeConfig,
  define: {
    REACT_APP_ENV: REACT_APP_ENV,
  },
  alias: {
    themes: join(__dirname, '../src/themes'),
    '@config': join(__dirname, '.'),
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `wt-site${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV],
  block: {
    defaultGitUrl: 'https://github.com/wetrial/wetrial-blocks/tree/master/src',
    npmClient: 'yarn', // 优先级低于 umi block add [block] --npm-client
  },
  chainWebpack: chinaWebpack,
} as IConfig;
