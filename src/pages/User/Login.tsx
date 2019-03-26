import React from 'react';
import { Card, Form, Input, Icon, Button } from 'antd';
import { connect } from 'dva';
import { getToken } from '@/wetrial/store';
import router from "umi/router";
import { FormComponent } from '@/wetrial';
import { getTextRequire } from '@/wetrial/validation';
import { getRedirect } from '@/utils';
import styles from './Login.less';

const FormItem = Form.Item;

export interface LoginPageProps {
  loading?: boolean;
}

@connect(({ loading }) => ({
  loading: loading.effects['user/login']
}))
class LoginPage extends FormComponent<LoginPageProps, any> {
  componentDidMount() {
    if (getToken()) {
      const redirect=getRedirect();
      router.push(redirect);
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { form, dispatch } = this.props;

    form.validateFields((error, values) => {
      if (error) {
        return;
      }
      dispatch({
        type: 'user/login',
        payload: values
      });
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loading
    } = this.props;

    return (
      <div className={styles.main}>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [
                  getTextRequire()
                ]
              })(
                <Input autoComplete="off" prefix={<Icon type="user" />} placeholder="用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  getTextRequire()
                ]
              })(
                <Input.Password
                  prefix={<Icon type="lock" />}
                  placeholder="密码"
                  autoComplete="off"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className={styles.loginButton}
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(LoginPage);
