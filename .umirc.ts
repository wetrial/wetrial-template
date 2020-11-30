import { join } from 'path';
import { defineConfig, utils } from 'umi';
import defaultSetting from './config/defaultSettings';
// import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
// import slash from 'slash2';
// import themePluginConfig from './themePluginConfig';
import proxy from './config/proxy';
import routes from './config/routes';
import themeConfig from './config/theme.config';

const { REACT_APP_ENV = 'dev' } = process.env;

const { winPath } = utils;

export default defineConfig({
  favicon: '/favicon.ico',
  runtimePublicPath: true,
  history: {
    type: 'browser',
  },
  hash: true,
  antd: {},
  request: false,
  layout: {
    title: defaultSetting.title,
    theme: defaultSetting.navTheme,
    //locale: false,
  },
  dva: {
    immer: true,
    hmr: true,
  },
  // locale: false,
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
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
  proxy: proxy[REACT_APP_ENV],
  // plugins: [new AntdDayjsWebpackPlugin()],
  chunks: ['react', 'antd', 'umi'],
  chainWebpack(config, { webpack }) {
    config.optimization.splitChunks({
      // chunks: 'all',
      // minSize: 30000,
      // minChunks: 3,
      // automaticNameDelimiter: '.',
      cacheGroups: {
        // 组件库相关
        react: {
          name: 'react',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|classnames|lodash|ahooks|moment)[\\/]/,
          priority: 12,
        },
        antd: {
          name: 'antd',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
          priority: 11,
        },
        // wetrial: {
        //   name: 'wetrial',
        //   chunks: 'all',
        //   test: /[\\/]node_modules[\\/](@wetrial)/,
        //   priority: 10,
        // },
        // 图表库相关
        // charts: {
        //   name: 'charts',
        //   chunks: 'all',
        //   test: /[\\/]node_modules[\\/](echarts|bizcharts|@antv)[\\/]/,
        //   priority: 11,
        // },
        // vendors: {
        //   name: 'vendors',
        //   chunks: 'all',
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: 9,
        // },
      },
    });
  },
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
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  //   'moment': 'moment',
  //   'lodash': '_',
  //   'ramda': 'R',
  //   'antd': 'antd',
  // },
  // // 引入被 external 库的 scripts
  // scripts:
  //   process.env.NODE_ENV === "development"
  //     ? [
  //         "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.development.js",
  //         "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.development.js",
  //         "https://cdn.jsdelivr.net/npm/moment@2.27.0/moment.js",
  //         "https://cdn.jsdelivr.net/npm/lodash@4.17.19/lodash.js",
  //         "https://cdn.jsdelivr.net/npm/ramda@0.27.1/dist/ramda.js",
  //         "https://cdn.jsdelivr.net/npm/antd@4.5.2/dist/antd.js",
  //       ]
  //     : [
  //         "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.development.js",
  //         "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js",
  //         "https://cdn.jsdelivr.net/npm/moment@2.27.0/moment.min.js",
  //         "https://cdn.jsdelivr.net/npm/lodash@4.17.19/lodash.min.js",
  //         "https://cdn.jsdelivr.net/npm/ramda@0.27.1/dist/ramda.min.js",
  //         "https://cdn.jsdelivr.net/npm/antd@4.5.2/dist/antd.min.js",
  //       ],

  // styles:
  //   process.env.NODE_ENV === "development"
  //     ? ["https://cdn.jsdelivr.net/npm/antd@4.5.2/dist/antd.css"]
  //     : ["https://cdn.jsdelivr.net/npm/antd@4.5.2/dist/antd.min.css"],
});
