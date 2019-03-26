import { IPlugin } from 'umi-types';

// ref: https://umijs.org/plugin/umi-plugin-react.html
const plugins: IPlugin[] = [
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
  ];

export default plugins;
