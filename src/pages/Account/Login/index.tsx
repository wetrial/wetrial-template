import React from 'react';
import { Link, ConnectProps, Loading, connect, useModel, history } from 'umi';
import { Form, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { IAccountModelState } from '@/models/account';
import styles from './index.less';
import logo from '@/assets/logo.png';

const FormItem = Form.Item;

interface ILoginPageProps extends ConnectProps {
  submitting?: boolean;
}

const Login: React.FC<ILoginPageProps> = ({ submitting, dispatch }) => {
  const { refresh } = useModel('@@initialState');

  const onFinish = values => {
    const {
      // @ts-ignore
      location: { query },
    } = history;

    dispatch &&
      dispatch({
        type: 'account/login',
        payload: values,
      }).then(async () => {
        await refresh();
        history.push(query.redirect || '/');
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
            <Input
              autoFocus
              prefix={<UserOutlined />}
              autoComplete="off"
              placeholder="用户名:admin"
            />
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
            <Button loading={submitting} type="primary" htmlType="submit" className={styles.login}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default connect(
  ({ account, loading }: { account: IAccountModelState; loading: Loading }) => ({
    account,
    submiting: loading.effects['account/login'],
  }),
)(Login);
