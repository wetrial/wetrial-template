import React from 'react';
import classNames from 'classnames';
import Omit from 'omit.js';

import { useDeepCompareEffect } from '@ant-design/pro-layout/es/utils/utils';
import { getFlatMenus } from '@ant-design/pro-layout/es/SiderMenu/SiderMenuUtils';
import MenuCounter from '@ant-design/pro-layout/es/SiderMenu/Counter';
import SiderMenu, { SiderMenuProps } from './SideMenu';

const SiderMenuWrapper: React.FC<SiderMenuProps> = (props) => {
  const { menuData, style, className, hide } = props;
  const { setFlatMenus, setFlatMenuKeys } = MenuCounter.useContainer();

  useDeepCompareEffect(() => {
    if (!menuData || menuData.length < 1) {
      return () => null;
    }
    // // 当 menu data 改变的时候重新计算这两个参数
    const newFlatMenus = getFlatMenus(menuData);
    const animationFrameId = requestAnimationFrame(() => {
      setFlatMenus(newFlatMenus);
      setFlatMenuKeys(Object.keys(newFlatMenus));
    });
    return () => window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
  }, [menuData]);

  const omitProps = Omit(props, ['className', 'style']);

  if (hide) {
    return null;
  }
  return (
    <SiderMenu
      className={classNames('ant-pro-sider-menu', className)}
      {...omitProps}
      style={style}
    />
  );
};

export default SiderMenuWrapper;
