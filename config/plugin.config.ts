import os from 'os';
import { IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings';

const { pwa } = defaultSettings;
const { TEST } = process.env;

// ref: https://umijs.org/plugin/umi-plugin-react.html
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
        immer: true,
      },
      locale: {
        enable: false, // default false
        default: 'zh-CN', // default zh-CN
        baseNavigator: false, // default true, when it is true, will use `navigator.language` overwrite default
        // antd: true, // 是否启用antd的<LocaleProvider />
      },
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/PageLoading',
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
      ...(!TEST && os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'lodash'],
              exclude: ['@babel/runtime', 'netlify-lambda'],
            },
            hardSource: false,
          }
        : {}),
      title: 'wetrial-template',
      hardSource: process.platform === 'darwin' /* isMac */,
    },
  ],
];

export default plugins;
