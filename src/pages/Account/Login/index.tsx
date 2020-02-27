import React, { useEffect } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Form, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getToken } from '@/utils/authority';
import router from 'umi/router';
import { IConnectProps, IConnectState } from '@/models/connect';
import styles from './index.less';
import logo from '@/assets/logo.png';

const FormItem = Form.Item;

interface ILoginPageProps extends IConnectProps {
  submitting?: boolean;
}

const Login: React.FC<ILoginPageProps> = ({ location, dispatch, submitting }) => {
  useEffect(() => {
    const tokenValue = getToken();
    if (location?.pathname === '/account/login' && tokenValue) {
      router.push({
        pathname: '/',
      });
    }
  }, []);

  const onFinish = values => {
    dispatch({
      type: 'account/login',
      payload: values,
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
        <Form onFinish={onFinish} autoComplete="off">
          <FormItem name="identificationName" rules={[{ required: true, whitespace: true }]}>
            <Input prefix={<UserOutlined />} autoComplete="off" placeholder="用户名" />
          </FormItem>
          <FormItem name="password" rules={[{ required: true, whitespace: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </FormItem>
          <FormItem>
            <Link className={styles.forgot} to="/account/forget">
              忘记密码
            </Link>
          </FormItem>
          <FormItem>
            <Button loading={submitting} type="primary" htmlType="submit" className={styles.login}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};
export default connect(({ loading }: IConnectState) => ({
  submitting: loading.effects['account/login'],
}))(Login);
