import { defineConfig, utils } from 'umi';
import { join } from 'path';
// import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
// import slash from 'slash2';
// import themePluginConfig from './themePluginConfig';
import proxy from './config/proxy';
import themeConfig from './config/theme.config';
import routes from './config/routes';
import chinaWebpack from './config/plugin.chinaWebpack';

const { REACT_APP_ENV = 'dev' } = process.env;

const { winPath } = utils;

// const plugins: IPlugin[] = [
//   ['umi-plugin-antd-icon-config', {}],

// ];

export default defineConfig({
  favicon: '/favicon.ico',
  runtimePublicPath: true,
  antd: {},
  request: false,
  layout: {
    title: 'Wetrial',
    theme: 'light',
    locale: false,
  },
  dva: {
    immer: true,
    hmr: true,
    skipModelValidate: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  // 暂时关闭
  pwa: false,
  history: {
    type: 'browser',
  },
  hash: true,
  ignoreMomentLocale: true,
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
    themes: join(__dirname, './src/themes'),
    '@config': join(__dirname, './config'),
    '@modules/*': join(__dirname, './src/modules/*'),
  },
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    // 这里的 modules 可以接受 getLocalIdent
    modules: {
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
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `wt-site${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV],
  // plugins: [new AntdDayjsWebpackPlugin()],
  chainWebpack: chinaWebpack,
  // 配置具体含义见：https://github.com/umijs/umi-webpack-bundle-analyzer#options-for-plugin
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
});
