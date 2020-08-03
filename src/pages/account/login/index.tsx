import React from 'react';
import { Link, useModel, history } from 'umi';
import { Form, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { setToken } from '@wetrial/core/es/authority';
import { login } from '@/services/account';

import styles from './index.less';
import logo from '@/assets/logo.png';

const FormItem = Form.Item;

export default () => {
  const { refresh } = useModel('@@initialState');
  const { loading, run } = useRequest(login, {
    manual: true,
  });

  const onFinish = (values) => {
    const {
      location: { query },
    } = history;

    run(values).then(async (token) => {
      if (token) {
        setToken({
          token,
        });
        await refresh();
        history.push(query.redirect || '/');
      }
    });
  };

  return (
    <div className={styles.top}>
      <div className={styles.header}>
        <img alt="logo" className={styles.logo} src={logo} />
        <span className={styles.title}>WeTrial</span>
      </div>
      <div className={styles.desc}>&nbsp;</div>

      <div className={styles.main}>
        <Form
          initialValues={{ identificationName: 'admin', password: 'Abcd1234' }}
          onFinish={onFinish}
        >
          <FormItem name="identificationName" rules={[{ required: true, whitespace: true }]}>
            <Input autoFocus prefix={<UserOutlined />} placeholder="用户名:admin" />
          </FormItem>
          <FormItem name="password" rules={[{ required: true, whitespace: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码:Abcd1234" />
          </FormItem>
          <FormItem>
            <Link className={styles.forgot} to="/account/forget">
              忘记密码
            </Link>
          </FormItem>
          <FormItem>
            <Button loading={loading} type="primary" htmlType="submit" className={styles.login}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};
