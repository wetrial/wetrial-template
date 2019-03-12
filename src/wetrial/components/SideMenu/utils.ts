import memoizeOne from 'memoize-one';
import pathToRegexp from 'path-to-regexp';
import { isEqual, omit } from 'lodash';
import { isUrl, includes } from '../../utils/utils';

/**
 * 单项菜单的属性
 */
export interface IMenuItemProps {
  name: string; // 名称 建议字符串，如果是多语言的情况 最终的多语言key为:menu.[父级].[name]
  icon?: string; // 使用的图标 一般指类型
  selfIcon?: boolean; // 是否使用自定义图标，是则使用自定义组件中的icon
  path: string; // 路径,只需要写子菜单的，将自动拼接父级
  children?: IMenuItemProps[]; // 子菜单
  authority?: string | string[]; // 该菜单需要的权限 支持字符串或者字符串数组(子菜单默认集成父级的)
  hideInBreadcrumb?: boolean; // 是否在面包屑中隐藏
  hideInMenu?: boolean; // 是否在菜单中隐藏
}

/**
 * 递归补全菜单的path、authority信息
 * @param menus 路由数组
 * @param parentPath  上级路由
 * @param parentAuthority  上级权限
 */
function formatter(
  menus: IMenuItemProps[],
  parentPath: string = '/',
  parentAuthority: string | string[] = ''
) {
  return menus.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

/**
 * 将url转成各种父子url的数组列表
 * @param url url地址
 * @example /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
 */
export function urlToList(url: string): string[] {
  const urlList = url.split('/').filter(i => i);
  return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`);
}

/**
 * 递归获取菜单中的路由集合
 * [{path:'/dash'},{path:'/form'}] => ['/dash','/form']
 * @param  menus
 */
export const getFlatMenuKeys = (menus: IMenuItemProps[]): string[] => {
  let keys = [];
  menus.forEach(item => {
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};

export const getMenuMatches = (flatMenuKeys: string[], path: string): string[] => {
  return flatMenuKeys.filter(item => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  });
};

/**
 * 获得菜单子节点
 * @memberof SiderMenu
 */
export const getDefaultCollapsedSubMenus = props => {
  const {
    location: { pathname },
    flatMenuKeys,
  } = props;
  return urlToList(pathname)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item);
};

/**
 * 根据菜单和权限过滤有权限访问的菜单
 */
function getPermissionsMenu(menus: IMenuItemProps[], permissions: string[]): IMenuItemProps[] {
  return menus.map(item => {
    if (includes<string>(permissions, item.authority)) {
      const result = omit(item, 'children');
      if (item.children) {
        const subResult = getPermissionsMenu(item.children, permissions);
        if (subResult && subResult.length > 0) {
          result['children'] = subResult;
        }
      }
      return result;
    }
    return null;
  });
}

/**
 * 获取有权限的菜单列表
 */
export const getMenus = memoizeOne((datas: IMenuItemProps[], permissions: string[]) => {
  const allMenus = formatter(datas);
  return getPermissionsMenu(allMenus, permissions);
}, isEqual);
