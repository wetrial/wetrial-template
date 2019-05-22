import React from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import styles from './index.less';

declare type OverlayFunc = () => React.ReactNode;

export interface HeaderDropdownProps extends DropDownProps {
  overlayClassName?: string;
  overlay: React.ReactNode | OverlayFunc;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

export default class HeaderDropdown extends React.Component<HeaderDropdownProps, any> {
  render() {
    const { overlayClassName, ...props } = this.props;
    return (
      <Dropdown overlayClassName={classNames(styles.container, overlayClassName)} {...props} />
    );
  }
}
