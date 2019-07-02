import { IConfig } from 'umi-types';
// https://umijs.org/config/
import { join } from 'path';
import pageRoutes from './config/router.config';
import themeConfig from './config/theme.config';
import pluginConfig from './config/plugin.config';
import webpackPlugin from './config/plugin.chinaWebpack';

const { APP_TYPE } = process.env;

const config: IConfig = {
  history: 'hash',
  hash: true,
  targets: {
    ie: 11,
  },
  routes: pageRoutes,
  treeShaking: true,
  plugins: pluginConfig,
  define: {
    APP_TYPE: APP_TYPE || '',
  },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme
  theme: themeConfig,
  // proxy: {
  //   '/api/v1/weather': {
  //     target: 'https://api.seniverse.com/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api/v1/weather': '/v3/weather' },
  //   },
  // },
  alias: {
    themes: join(__dirname, './src/themes'),
    '@config': join(__dirname, './config')
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
      localIdentName: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant-design-wetrial.less') ||
        context.resourcePath.includes('global.less') ||
        context.resourcePath.includes('themes\\vars.less') ||
        context.resourcePath.includes('themes\\index.less') ||
        context.resourcePath.includes('themes\\utils.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
};

// ref: https://umijs.org/config/
export default config;
