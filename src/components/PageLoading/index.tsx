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
  const { full = true, className } = props;
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
  return (
    <Spin
      spinning
      size={full ? 'large' : 'default'}
      {...spinProps}
      className={classNames(className, { [styles.full]: full })}
    />
  );
}

PageLoading.defaultProps = {
  full: true,
};

export default PageLoading;
