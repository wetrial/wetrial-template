import logo from '@/assets/logo.png';
import { login } from '@/services/account';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { tokener } from '@wetrial/core';
import { useRequest } from 'ahooks';
import { Alert, Button, Form, Input } from 'antd';
import React from 'react';
import { history, Link, useModel } from 'umi';
import styles from './index.less';

const FormItem = Form.Item;

export default () => {
  const { refresh } = useModel('@@initialState');
  const { loading, run, error } = useRequest(login, {
    manual: true,
    onError: () => {},
  });

  const onFinish = (values) => {
    const {
      location: { query },
    } = history;

    run(values).then(async (token) => {
      if (token) {
        tokener.setToken({
          token,
        });
        await refresh();
        const strQuery = (query && (query['redirect'] as string)) || '/';
        history.push(strQuery);
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
          {error && error['data'] && error['data']['error'] ? (
            <FormItem>
              <Alert message={error['data']['error']['message']} type="error" showIcon />
            </FormItem>
          ) : null}
          <FormItem name="identificationName" rules={[{ required: true, whitespace: true }]}>
            <Input autoFocus prefix={<UserOutlined />} placeholder="用户名:admin/user" />
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
