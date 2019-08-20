import React from 'react';
import { PureComponent } from 'wetrial';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { connect } from 'dva';
import { FORM_SINGLE_LAYOUT } from '@/constants';


import {IViewProps} from './props'

const FormItem = Form.Item;

@connect(({ example_tenant: { model }, loading }) => ({
  model,
  submitting: loading.effects['example_tenant/saveTenant'],
}))
// @ts-ignore
@Form.create()
class Edit extends PureComponent<IViewProps> {
  componentDidMount() {
    const {
      dispatch,
      id
    } = this.props;
    dispatch({
      type: 'example_tenant/getTeannt',
      payload: { id },
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      model,
      onClose
    } = this.props;
    return (
      <Modal
        title="查看租户信息"
        visible
        onCancel={onClose.bind(this,false)}
        footer={[
            <Button key="back" onClick={onClose.bind(this,true)}>
              关闭
            </Button>
          ]}
      >
        <Form labelCol={{span:4}} wrapperCol={{span:20}}>
          <FormItem label="租户编码">
            {getFieldDecorator('tenancyName', {
              initialValue: model.tenancyName,
            })(<Input disabled autoComplete="off" />)}
          </FormItem>
          <FormItem label="名称">
            {getFieldDecorator('name', {
              initialValue: model.name,
            })(<Input disabled autoComplete="off" />)}
          </FormItem>
          <FormItem colon={false} label="&nbsp;">
            {getFieldDecorator('isActive', {
              valuePropName: 'checked',
              initialValue: model.isActive,
            })(<Checkbox disabled>激活</Checkbox>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Edit;
