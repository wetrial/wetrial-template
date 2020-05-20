import React from 'react';
import classNames from 'classnames';
import Omit from 'omit.js';
import { getFlatMenus } from '@umijs/route-utils';

import MenuCounter from '@ant-design/pro-layout/es/SiderMenu/Counter';
import { useDeepCompareEffect } from '@ant-design/pro-layout/es/utils/utils';
import SiderMenu, { SiderMenuProps } from './SideMenu';

const SiderMenuWrapper: React.FC<SiderMenuProps> = (props) => {
  const {
    // isMobile,
    menuData,
    // siderWidth,
    // collapsed,
    // onCollapse,
    style,
    className,
    hide,
    prefixCls,
  } = props;
  const { setFlatMenuKeys } = MenuCounter.useContainer();

  useDeepCompareEffect(() => {
    if (!menuData || menuData.length < 1) {
      return () => null;
    }
    // // 当 menu data 改变的时候重新计算这两个参数
    const newFlatMenus = getFlatMenus(menuData);
    const animationFrameId = requestAnimationFrame(() => {
      setFlatMenuKeys(Object.keys(newFlatMenus));
    });
    return () => window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
  }, [menuData]);

  // useEffect(() => {
  //   if (isMobile === true) {
  //     if (onCollapse) {
  //       onCollapse(true);
  //     }
  //   }
  // }, [isMobile]);

  const omitProps = Omit(props, ['className', 'style']);

  if (hide) {
    return null;
  }
  return (
    <SiderMenu
      className={classNames(`${prefixCls}-sider`, className)}
      {...omitProps}
      style={style}
    />
  );
};

SiderMenuWrapper.defaultProps = {
  onCollapse: () => undefined,
};

export default SiderMenuWrapper;
