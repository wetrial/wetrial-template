import Icon from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import useMergeValue from 'use-merge-value';
import { useDebounceFn } from '@umijs/hooks';

import { MenuMode, MenuProps } from 'antd/es/menu';
import { MenuTheme } from 'antd/es/menu/MenuContext';
import { Settings as ProSettings, RouteContext } from '@ant-design/pro-layout';
import { getSelectedMenuKeys } from '@ant-design/pro-layout/es/SiderMenu/SiderMenuUtils';
import { isUrl, getOpenKeysFromMenuData } from '@ant-design/pro-layout/es/utils/utils';
import { IconFont } from '@wetrial/component';
import {
  MenuDataItem,
  MessageDescriptor,
  Route,
  RouterTypes,
  WithFalse,
} from '@ant-design/pro-layout/es/typings';
import MenuCounter from '@ant-design/pro-layout/es/SiderMenu/Counter';

const { SubMenu } = Menu;

export interface BaseMenuProps
  extends Partial<RouterTypes<Route>>,
    Omit<MenuProps, 'openKeys' | 'onOpenChange'>,
    Partial<ProSettings> {
  className?: string;
  collapsed?: boolean;
  handleOpenChange?: (openKeys: string[]) => void;
  isMobile?: boolean;
  menuData?: MenuDataItem[];
  mode?: MenuMode;
  onCollapse?: (collapsed: boolean) => void;
  openKeys?: WithFalse<string[]> | undefined;
  /**
   * 要给菜单的props, 参考antd-menu的属性。https://ant.design/components/menu-cn/
   */
  menuProps?: MenuProps;
  style?: React.CSSProperties;
  theme?: MenuTheme;
  formatMessage?: (message: MessageDescriptor) => string;
  subMenuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
      },
      defaultDom: React.ReactNode,
    ) => React.ReactNode
  >;
  menuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
      },
      defaultDom: React.ReactNode,
    ) => React.ReactNode
  >;
  postMenuData?: (menusData?: MenuDataItem[]) => MenuDataItem[];
}

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon?: string | React.ReactNode): React.ReactNode => {
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon)) {
      return (
        <Icon component={() => <img src={icon} alt="icon" className="ant-pro-sider-menu-icon" />} />
      );
    }
    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />;
    }
  }
  return icon;
};

class MenuUtil {
  constructor(props: BaseMenuProps) {
    this.props = props;
  }

  props: BaseMenuProps;

  getNavMenuItems = (menusData: MenuDataItem[] = []): React.ReactNode[] =>
    menusData
      .filter((item) => item.name && !item.hideInMenu)
      .map((item) => this.getSubMenuOrItem(item))
      .filter((item) => item);

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item: MenuDataItem): React.ReactNode => {
    if (
      Array.isArray(item.children) &&
      !item.hideChildrenInMenu &&
      item.children.some((child) => child && !!child.name)
    ) {
      const name = this.getIntlName(item);
      const { subMenuItemRender } = this.props;
      //  get defaultTitle by menuItemRender
      const defaultTitle = item.icon ? (
        <span>
          {getIcon(item.icon)}
          <span>{name}</span>
        </span>
      ) : (
        name
      );

      // subMenu only title render
      const title = subMenuItemRender
        ? subMenuItemRender({ ...item, isUrl: false }, defaultTitle)
        : defaultTitle;
      return (
        <SubMenu title={title} key={item.key || item.path} onTitleClick={item.onTitleClick}>
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    const icon = getIcon(item.icon);
    return (
      <Menu.Item icon={icon} key={item.key || item.path}>
        {this.getMenuItemPath(item)}
      </Menu.Item>
    );
  };

  getIntlName = (item: MenuDataItem) => {
    const { name, locale } = item;
    const {
      menu = {
        locale: false,
      },
      formatMessage,
    } = this.props;
    if (locale && menu.locale !== false && formatMessage) {
      return formatMessage({
        id: locale,
        defaultMessage: name,
      });
    }
    return name;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item: MenuDataItem) => {
    const itemPath = this.conversionPath(item.path || '/');
    const { location = { pathname: '/' }, isMobile, onCollapse, menuItemRender } = this.props;
    const { target } = item;
    // if local is true formatMessage all name。
    const name = this.getIntlName(item);
    let defaultItem = <span>{name}</span>;
    const isHttpUrl = isUrl(itemPath);

    // Is it a http link
    if (isHttpUrl) {
      defaultItem = (
        <a href={itemPath} target={target}>
          <span>{name}</span>
        </a>
      );
    }

    if (menuItemRender) {
      return menuItemRender(
        {
          ...item,
          isUrl: isHttpUrl,
          itemPath,
          isMobile,
          replace: itemPath === location.pathname,
          onClick: () => onCollapse && onCollapse(true),
        },
        defaultItem,
      );
    }
    return defaultItem;
  };

  conversionPath = (path: string) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };
}

/**
 * 生成openKeys 的对象，因为设置了openKeys 就会变成受控，所以需要一个空对象
 * @param BaseMenuProps
 */
const getOpenKeysProps = (
  openKeys: string[] | false = [],
  { layout, collapsed }: BaseMenuProps,
): {
  openKeys?: undefined | string[];
} => {
  let openKeysProps = {};
  if (openKeys && !collapsed && layout === 'side') {
    openKeysProps = {
      openKeys,
    };
  }
  return openKeysProps;
};

const BaseMenu: React.FC<BaseMenuProps> = (props) => {
  const {
    theme,
    mode,
    location = {
      pathname: '/',
    },
    className,
    handleOpenChange,
    style,
    menuData,
    menu = { locale: true },
    selectedKeys: propsSelectedKeys,
    onSelect,
    openKeys: propsOpenKeys,
  } = props;
  // 用于减少 defaultOpenKeys 计算的组件
  const defaultOpenKeysRef = useRef<string[]>([]);

  const { pathname } = location;

  const { flatMenuKeys } = MenuCounter.useContainer();
  const [defaultOpenAll, setDefaultOpenAll] = useState(menu.defaultOpenAll);

  const [topMenuKey, setTopMenuKey] = useState('');

  const [openKeys, setOpenKeys] = useMergeValue<WithFalse<string[] | undefined>>(
    () => {
      if (menu.defaultOpenAll) {
        return getOpenKeysFromMenuData(menuData) || [];
      }
      if (propsOpenKeys === false) {
        return false;
      }
      return [];
    },
    {
      value: propsOpenKeys === false ? undefined : propsOpenKeys,
      onChange: handleOpenChange as any,
    },
  );

  useEffect(() => {
    if (menu.defaultOpenAll || propsOpenKeys === false) {
      return;
    }
    const keys = getSelectedMenuKeys(location.pathname || '/', menuData || []);
    setOpenKeys(keys);
  }, [flatMenuKeys.join('-')]);

  const [selectedKeys, setSelectedKeys] = useMergeValue<string[] | undefined>([], {
    value: propsSelectedKeys,
    onChange: onSelect
      ? (keys) => {
          if (onSelect && keys) {
            onSelect(keys as any);
          }
        }
      : undefined,
  });

  const { run: debounceSetTopMenuKey } = useDebounceFn((key) => {
    setTopMenuKey(key);
  }, 200);

  useEffect(() => {
    // if pathname can't match, use the nearest parent's key
    const keys = getSelectedMenuKeys(location.pathname || '/', menuData || []);
    const animationFrameId = requestAnimationFrame(() => {
      setSelectedKeys(keys);
      if (!defaultOpenAll && propsOpenKeys !== false) {
        setOpenKeys(keys);
      } else {
        setDefaultOpenAll(false);
      }
    });
    return () => window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
  }, [pathname, flatMenuKeys.join('-')]);

  const openKeysProps = getOpenKeysProps(openKeys, props);
  const cls = classNames(className, {
    'wt-layout-top-level-menu': mode === 'horizontal',
  });
  const menuUtils = new MenuUtil(props);

  const postData = props.postMenuData ? props.postMenuData(menuData) : menuData;

  // 这次 openKeys === false 的时候的情况，这种情况下帮用户选中一次
  // 第二次以后不再关系，所以用了 defaultOpenKeys
  if (props.openKeys === false && !props.handleOpenChange) {
    const keys = getSelectedMenuKeys(location.pathname || '/', menuData || []);
    defaultOpenKeysRef.current = keys;
    if (keys.length < 1) {
      return null;
    }
  }
  return (
    <>
      <Menu
        {...openKeysProps}
        key="Menu"
        mode={mode}
        defaultOpenKeys={defaultOpenKeysRef.current}
        theme={theme}
        selectedKeys={selectedKeys}
        style={style}
        className={cls}
        onOpenChange={setOpenKeys}
        {...props.menuProps}
      >
        {postData
          ?.filter((item) => item.name && !item.hideInMenu)
          .map((item) => {
            const icon = getIcon(item.icon);
            const itemKey = item.key || item.path;
            const needShowSubMenu =
              topMenuKey &&
              topMenuKey === itemKey &&
              Array.isArray(item.children) &&
              !item.hideChildrenInMenu &&
              item.children.some((child) => child && !!child.name);

            return (
              <Menu.Item
                onMouseEnter={debounceSetTopMenuKey.bind(null, itemKey)}
                onMouseLeave={debounceSetTopMenuKey.bind(null, '')}
                icon={icon}
                key={itemKey}
              >
                {menuUtils.getMenuItemPath(item)}
                {needShowSubMenu && (
                  <div className="wt-sub-sider-menu-container">
                    <div>
                      <span>testNamingRule cddddddddddddddddddddddddddddddddd</span>
                    </div>
                    <div className="body">
                      <Menu
                        {...openKeysProps}
                        key="SubMenu"
                        mode="vertical-left"
                        defaultOpenKeys={defaultOpenKeysRef.current}
                        theme={theme}
                        selectedKeys={selectedKeys}
                        className="ant-pro-sider-menu"
                        onOpenChange={setOpenKeys}
                        {...props.menuProps}
                      >
                        {menuUtils.getNavMenuItems(item.children)}
                      </Menu>
                    </div>
                  </div>
                )}
              </Menu.Item>
            );
          })
          .filter((item) => item)}
      </Menu>
    </>
  );
};

BaseMenu.defaultProps = {
  postMenuData: (data) => data || [],
};

export default BaseMenu;
