/* eslint-disable global-require */
import { history } from 'umi';
import { stringify } from 'qs';
import { ILayoutRuntimeConfig } from '@umijs/plugin-layout';
import { BasicLayoutProps } from '@ant-design/pro-layout';
import { getCurrentUser } from '@/services/account';
import { ICurrentUser } from '@/models/account';
import { getToken, clearToken } from '@/utils/authority';

const { WETRIAL_ENV } = process.env;

function requireTheme(themePackage) {
  switch (themePackage) {
    case 'project':
      return require('@wetrial/theme-project');
    case 'organization':
      return require('@wetrial/theme-organization');
    case 'platform':
      return require('@wetrial/theme-platform');
    default:
      throw new Error(`不支持的主题:@wetrial/theme-${themePackage}`);
  }
}

const { initConfig, layout: themeLayout } = requireTheme(WETRIAL_ENV);

initConfig();

export function render(oldRender) {
  oldRender();
}

export async function getInitialState() {
  const token = getToken();
  const {
    // @ts-ignore
    location: { pathname },
  } = history;
  const loginPathName = '/account/login';
  // 未登录的情况
  if (!token) {
    if (pathname !== loginPathName) {
      // @ts-ignore
      history.push({
        pathname: loginPathName,
        query: {
          redirect: pathname,
        },
      });
    }
    return {};
  } else {
    return (await getCurrentUser()) as ICurrentUser;
  }
}

export const layout: ILayoutRuntimeConfig & BasicLayoutProps = {
  ...themeLayout,
  logout: () => {
    clearToken();
    const {
      location: { pathname },
    } = history;

    if (pathname !== '/account/login') {
      history.push({
        pathname: '/account/login',
        search: stringify({
          redirect: pathname,
        }),
      });
    }
  },
};
