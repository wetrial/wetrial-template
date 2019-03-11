// https://umijs.org/config/
import { resolve } from 'path';
import slash from 'slash2';

// ref: https://umijs.org/config/
export default {
  history: 'hash',
  // hash: true,
  targets: { ie: 11 },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: { immer: true },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: false, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/PageLoading',
        },
        title: 'wetrial-template',
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
          exclude:['wetrial']
        },
        hardSource: process.platform === 'darwin' /* isMac */,
        routes: {
          exclude: [
            /model\.(j|t)sx?$/,
            /locales\//,
            /utils\//,
            /models\//,
            /components\//,
            /services\//,
            /constants\//,
            /bases\//,
            /scripts\//,
          ],
          // update: routes => {
          //   const newRoutes = []
          //   for (const item of routes[0].routes) {
          //     if (item.path) {
          //       newRoutes.push(
          //         Object.assign({}, item, {
          //           path:`/:lang(${['en-US','zh-CN'].map(item => item).join('|')})` + item.path,
          //         })
          //       )
          //     }else{
          //       newRoutes.push(item);
          //     }
          //   }
          //   routes[0].routes = newRoutes
          //   return routes
          // }
        },
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
    themes: resolve(__dirname, './src/themes'),
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('global.less') ||
        context.resourcePath.includes('themes\\default.less') ||
        context.resourcePath.includes('themes\\mixin.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          // .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `wt-${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
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
