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
          antd: true // 是否启用antd的<LocaleProvider />
        },
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/PageLoading',
          level: 3,
        },
        pwa: {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        },
        title: 'wetrial-template',
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
          exclude: ['@babel/runtime', 'netlify-lambda']
        },
        hardSource: process.platform === 'darwin' /* isMac */,
      },
    ],
  ];

export default plugins;
