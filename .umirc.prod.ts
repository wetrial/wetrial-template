// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.UMI_ENV': 'prod',
  },
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
