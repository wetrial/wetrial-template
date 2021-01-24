import { join } from 'path';
import { defineConfig, utils } from 'umi';
import defaultSetting from './config/defaultSettings';
// import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
// import slash from 'slash2';
// import themePluginConfig from './themePluginConfig';
import proxy from './config/proxy';
import routes from './config/routes';
import themeConfig from './config/theme.config';
import { VALIDATE_MESSAGES } from './src/constants';

const { UMI_ENV = 'dev' } = process.env;

const { winPath } = utils;

export default defineConfig({
  favicon: '/favicon.ico',
  runtimePublicPath: true,
  history: {
    type: 'browser',
  },
  hash: true,
  antd: {
    // dark: true,
    // compact: true,
    config: {
      form: { validateMessages: VALIDATE_MESSAGES },
      input: {
        autoComplete: 'off',
      },
    },
  },
  request: false,
  layout: {
    logo: defaultSetting.logo,
    title: defaultSetting.title,
    theme: defaultSetting.navTheme,
    iconfontUrl: defaultSetting.iconfontUrl,
    locale: false, // 不启用菜单的多语言
    siderWidth: 208,
  },
  dva: {
    immer: true,
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  ignoreMomentLocale: true,
  targets: {
    ie: 11,
  },
  esbuild: {},
  fastRefresh: {},
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: themeConfig,
  alias: {
    themes: join(__dirname, './src/themes'),
    '@config': join(__dirname, './config'),
    '@modules': join(__dirname, './src/modules'),
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
  proxy: proxy[UMI_ENV],
  // plugins: [new AntdDayjsWebpackPlugin()],
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
});
