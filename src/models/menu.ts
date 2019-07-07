import memoizeOne from 'memoize-one';
import extendModel from '@wetrial/model';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi-plugin-react/locale';
import defaultSettings from '@config/defaultSettings';
import Authorized from '@/utils/Authorized';

const { check } = Authorized;

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  if (!data) {
    return undefined;
  }
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }
      // if enableMenuLocale use item.name,
      // close menu international
      const name = defaultSettings.menu.locale
        ? formatMessage({ id: locale, defaultMessage: item.name })
        : item.name;
      const result = {
        ...item,
        name,
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (
    item.children &&
    !item.hideChildrenInMenu &&
    item.children.some(child => child.name)
  ) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => check(item.authority, getSubMenu(item),null))
    .filter(item => {
      if (item) {
        const hasChildrens = !item.children || item.children.length > 0;
        return hasChildrens;
      }
      return false;
    });
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  if (!menuData) {
    return {};
  }
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(
  getBreadcrumbNameMap,
  isEqual,
);

export default extendModel({
  namespace: 'menu',
  state: {
    menuData: [], // 当前有权限的菜单列表
    routerData: [], // 当前系统配置的所有路由列表
    breadcrumbNameMap: {}, // 根据路由生成的面包屑
  },
  effects: {
    // 根据当前权限生成菜单 用于layout页面第一次生成的场景
    *getMenuData({ payload }, { put }) {
      const { routes, authority } = payload;
      const originalMenuData = memoizeOneFormatter(routes, authority,null);
      const menuData = filterMenuData(originalMenuData);
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(
        originalMenuData,
      );
      yield put({
        type: 'update',
        payload: { menuData, breadcrumbNameMap, routerData: routes },
      });
    },
    // 重新生成菜单，一般用于动态修改当前用户角色的场景
    *reloadMenu(_, { put, select }) {
      const routes = yield select(state => state.menu.routerData);
      const originalMenuData = memoizeOneFormatter(routes, '',null);
      const menuData = filterMenuData(originalMenuData);
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(
        originalMenuData,
      );
      yield put({
        type: 'update',
        payload: { menuData, breadcrumbNameMap, routerData: routes },
      });
    },
  },
});
