import React from 'react';
import { pick } from 'lodash';
import { SpinProps } from 'antd/es/spin';
import { Spin } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

interface IPageLoadingProp extends SpinProps {
  full?: boolean;
}

function PageLoading(props: IPageLoadingProp) {
  const { full, className } = props;
  const spinProps = pick(
    props,
    'prefixCls',
    'spinning',
    'style',
    'size',
    'tip',
    'delay',
    'wrapperClassName',
    'indicator',
  );
  return <Spin {...spinProps} className={classNames(className, { [styles.full]: full })} />;
}

PageLoading.defaultProps = {
  full: false,
  spin: true,
};

export default PageLoading;
