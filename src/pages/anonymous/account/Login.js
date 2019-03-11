import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Form, Icon, Input, Button, Divider } from 'antd';
import { utils } from "@/wetrial";
import styles from './Login.less';

const {getTextRequire}=utils.validation;

const FormItem = Form.Item;

@connect(({ loading }) => ({
  submitting: loading.effects['global/login'],
}))
class Login extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { 
      dispatch, 
      form,
      location:{
        query:{
          redirect
        }
      } 
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'global/login',
          payload: {...values,redirect},
        });
      }
    });
  };

  render() {
    const {
      submitting,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.top}>
        <div className={styles.header}>
          <span className={styles.title}>登录</span>
        </div>
        <div className={styles.desc}>&nbsp;</div>
        <div className={styles.main}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('UserName', {
                rules: [getTextRequire()],
              })(<Input prefix={<Icon type="user" />} autoComplete="off" placeholder="用户名" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('Password', {
                rules: [getTextRequire()],
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  type="password"
                  autoComplete="off"
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem>
              {/* {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox className={styles['remembe-me']}>记住我</Checkbox>)} */}
              <Link className={styles.forgot} to="">
                忘记密码
              </Link>
            </FormItem>
            <FormItem>
              <Button
                loading={submitting}
                type="primary"
                htmlType="submit"
                className={styles.login}
              >
                登录
              </Button>
            </FormItem>
            <FormItem>
              <div className={styles.other}>
                其他登录方式
                <Divider type="vertical" />
                <Link className={styles.register} to="">
                  注册
                </Link>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
export default Form.create()(Login);