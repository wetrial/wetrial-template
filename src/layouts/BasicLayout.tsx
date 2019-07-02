import React, { useState } from 'react';

import Link from 'umi/link';
import RightContent from '@/components/GlobalHeader/RightContent';
// import { connect } from 'dva';
import {NormalLayout,SettingDrawer} from 'wetrial';
import {BasicLayoutProps} from 'wetrial/components/NormalLayout';
import { IMenuDataItem } from 'wetrial/types';
import {ISettings} from 'wetrial/defaultSettings';

import { formatMessage } from 'umi-plugin-react/locale';
import smallLog from '@/assets/imgs/wetrial-logo-small.jpg';



export interface BasicLayoutProps extends BasicLayoutProps {
  breadcrumbNameMap: {
    [path: string]: IMenuDataItem;
  };
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: IMenuDataItem;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const [collapsed, handleMenuCollapse] = useState<boolean>(true);
  const [settings, setSettings] = useState<Partial<ISettings>>({});

  return (
    <>
      <NormalLayout
        logo={smallLog}
        collapsed={collapsed}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => (
          <Link to={menuItemProps.path}>{defaultDom}</Link>
        )}
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} {...settings} />}
        {...props}
        {...settings}
      >
        {/* <PageHeaderWrapper>{props.children}</PageHeaderWrapper> */}
      </NormalLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={config => setSettings(config)}
      />
    </>
  );
};

export default BasicLayout;
