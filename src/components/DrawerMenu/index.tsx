import { Menu } from 'antd';
import { Link, useModel } from 'umi';

import React, { useRef } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import Item from 'antd/lib/list/Item';
import MainLogo from '../MainLogo';
import MainFooter from '../MainFooter';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

export interface DrawerMenuProps {}

const DrawerMenu: React.FC<DrawerMenuProps> = (props) => {
  const { prop } = props;

  const { SubMenu } = Menu;

  const mainTree: any[] = [];
  let subTree: any[] = [];

  function createMain(arr) {
    arr.forEach((item) => {
      if (item.menu && item.menu.flatMenu) {
        createMain(item.routes);
      } else if (item.layout && item.layout.hideMenu) {
        return;
      } else if (!item.name) {
        return;
      } else {
        mainTree.push(item);
      }
    });
  }

  function renderSub(data) {
    subTree = [];
    if (data.routes && data.routes.length > 0) {
      subTree.push(data.routes);
    }
  }

  createMain(prop.route.routes);

  const { initialState } = useModel('@@initialState');
  console.log(initialState);

  return (
    <>
      <div>
        <MainLogo props={prop.logo} />
        <MainFooter />
        <Menu
          className="left-bar"
          // mode="inline"
          theme={prop.navTheme}
        >
          {mainTree.map((item) => (
            <Menu.Item>
              <Link onMouseEnter={renderSub.bind(null, item)} to={item.path}>
                <IconFont className="mainmenu-icon" type="icon-twitter" />
                {item.name}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        className="drawer-menu"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <span>Navigation One</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <span>Navigation Two</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <span>Navigation Three</span>
            </span>
          }
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};

export default DrawerMenu;
