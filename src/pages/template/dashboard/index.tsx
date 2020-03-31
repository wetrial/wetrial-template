import React from 'react';
import { useAccess, Access, useModel } from 'umi';
import { Card, DatePicker, Button } from 'antd';
import TemplatePermissions from '@config/modules/template';
import styles from './index.less';

export default (): React.ReactNode => {
  const model = useModel('@@initialState');
  const access = useAccess();
  return (
    <div className={styles.container}>
      <Card>
        <DatePicker />
        <hr />
        <Button
          onClick={() => {
            model.refresh();
          }}
        >
          刷新权限
        </Button>
      </Card>
      <Access accessible={access[TemplatePermissions.template.dashboard.index]} fallback="无权限">
        有权限才能看到的信息
      </Access>
    </div>
  );
};
