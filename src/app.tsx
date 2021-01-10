import RightContent from '@/components/RightContent';
import { getCurrentUser } from '@/services/account';
import type { IGlobalProps } from '@/services/global.d';
import { getToken } from '@/utils/authority';
import { request as requestMethod } from '@/utils/request';
import { UseRequestProvider } from '@ahooksjs/use-request';
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import defaultSettings from '@config/defaultSettings';
// import { omit } from 'lodash';
// import { initWetrialCore } from '@wetrial/core';
import { constants } from '@wetrial/core';
import { ConfigProvider as WetrialConfigProvider } from '@wetrial/provider';
import { ConfigProvider, notification } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React from 'react';
import { history } from 'umi';
import logo from './assets/logo.png';

moment.locale('zh-cn');

// (function init() {
//   // // 初始化核心库配置信息
//   // initWetrialCore({
//   //   RSAKey:
//   //     'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5HI3rQq9BKcruxYfqgnkhyuI+9CGf1jYsyzWYpdw/3Cv9TX4u5w2GjcYoxzBY5s6ZcXbb4oGoLt9rn93g7sKT01tyUO/iQdYiOTvPsFiqcInMVHhaazBy5nH50owObGs+PRubc8bP+a+DT3vV8+l7TEd/H9pdwok/r7GlIIe5uQIDAQAB',
//   // });
// })();

export function render(oldRender) {
  oldRender();
}

export async function getInitialState(): Promise<IGlobalProps> {
  const tokenStore = getToken();
  try {
    // 未登录的情况
    if (!tokenStore) {
      throw new Error('UNLOGIN');
    }
    const currentUser = await getCurrentUser();
    return {
      currentUser,
      settings: defaultSettings,
    };
  } catch (error) {
    const { message: errorMessage } = error;
    const {
      location: { pathname },
    } = history;
    // 未登录，处理跳转到登录页面
    if (errorMessage === 'UNLOGIN') {
      const loginPathName = '/account/login';
      pathname !== loginPathName &&
        history.push({
          pathname: loginPathName,
          query: {
            redirect: pathname,
          },
        });
    }
  }
  return {
    settings: defaultSettings,
  };
}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export function rootContainer(container) {
  return React.createElement(
    ConfigProvider,
    {
      form: { validateMessages: constants.VALIDATE_MESSAGES },
      input: {
        autoComplete: 'off',
      },
      locale: zhCN,
    },
    React.createElement(
      WetrialConfigProvider,
      {
        value: {
          iconFontUrl: defaultSettings.iconfontUrl, // 修改为项目中使用的icon地址
          // 全局配置useFormTable的响应结构，来符合前端组件的格式要求
          formatFormTableResult: (data) => {
            return {
              total: data.totalCount,
              list: data.items,
            };
          },
          // 全局配置useFormTable的请求参数，符合后端的格式要求
          formatFormTableRequest: ({ current, pageSize, sorter }, formData: any) => {
            let sortParam: any = {};
            if (sorter && sorter.order) {
              let sortName: string;
              // 对象的情况下 列为数组
              if (Array.isArray(sorter.field)) {
                sortName = sorter.field[sorter.field.length - 1];
              } else {
                sortName = sorter.field;
              }
              sortParam = {
                sorting: `${sortName} ${sorter.order === 'ascend' ? 'asc' : 'desc'}`,
              };
            }
            return {
              ...sortParam,
              skipCount: (current - 1) * pageSize,
              maxResultCount: pageSize,
              ...formData,
            };
          },
        },
      },
      React.createElement(
        UseRequestProvider,
        {
          value: {
            requestMethod: (param) => requestMethod(param),
            onError: (response) => {
              if (response && response.status) {
                const { status, statusText, data } = response;
                const notifyFunc = status >= 500 ? notification.error : notification.info;
                let message;
                if (data && typeof data === 'object' && 'error' in data) {
                  message = data.error?.message;
                }
                const errorText = message || codeMessage[status] || statusText;
                notifyFunc({
                  key: '__global_message',
                  message: '温馨提示',
                  description: errorText,
                });
              }
              if (!response) {
                notification.error({
                  key: '__global_message',
                  message: '网络开小差啦',
                  description: '您的网络发生异常，请重试或者联系客服',
                });
              }
              throw response;
            },
          },
        },
        container,
      ),
    ),
  );
}

export const layout = ({ initialState }: { initialState }): BasicLayoutProps => {
  return {
    navTheme: 'light',
    logo,
    iconfontUrl: defaultSettings.iconfontUrl,
    rightContentRender: () => <RightContent />,
    // footerRender: () => <DefaultFooter links={[]} copyright="2020 湖南微试云技术团队" />,
    ...initialState?.settings,
  };
};
