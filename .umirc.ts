// https://umijs.org/config/
import { resolve } from 'path';
import slash from 'slash2';
import pageRoutes from './config/router.config'

// ref: https://umijs.org/config/
export default {
  // history: 'hash',
  hash: true,
  targets: { ie: 11 },
  routes: pageRoutes,
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        dva: {
          hmr: true,
          immer: true
        },
        antd: true,
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: false, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/PageLoading',
          level: 3,
        },
        title: 'wetrial-template',
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch','antd/es']
        },
        hardSource: process.platform === 'darwin' /* isMac */,
        pwa: false
      },
    ],
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme
  theme: './config/theme.config.ts',
  // proxy: {
  //   '/api/v1/weather': {
  //     target: 'https://api.seniverse.com/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api/v1/weather': '/v3/weather' },
  //   },
  // },
  alias: {
    styles: resolve(__dirname, './src/styles')
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  // cssLoaderOptions: {
  //   modules: true,
  //   getLocalIdent: (context, localIdentName, localName) => {
  //     if (
  //       context.resourcePath.includes('node_modules') ||
  //       context.resourcePath.includes('global.less') ||
  //       context.resourcePath.includes('styles\\theme.less') ||
  //       context.resourcePath.includes('styles\\mixin.less')
  //     ) {
  //       return localName;
  //     }
  //     const match = context.resourcePath.match(/src(.*)/);
  //     if (match && match[1]) {
  //       const antdProPath = match[1].replace('.less', '');
  //       const arr = slash(antdProPath)
  //         .split('/')
  //         // .map(a => a.replace(/([A-Z])/g, '-$1'))
  //         .map(a => a.toLowerCase());
  //       return `wt-${arr.join('-')}-${localName}`.replace(/--/g, '-');
  //     }
  //     return localName;
  //   },
  // },
  manifest: {
    basePath: '/',
  },
  // chainWebpack(config) {
  //   // css打包成一个文件
  //   config.optimization.splitChunks({
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.(css|less)$/,
  //         chunks: 'async',
  //         minChunks: 1,
  //         minSize: 0,
  //       }
  //     },
  //   });
  // },
};
