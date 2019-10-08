import React from 'react';
import { Card, Form, Input, Button, InputNumber } from 'antd';
import { FormComponent, MultipleFormElement } from 'wetrial';
import { getComplexSame, getRange, required } from '@wetrial/validation';

// @ts-ignore
@Form.create()
export default class Demo extends FormComponent {
  handleSubmit = e => {
    e && e.preventDefault();
    this.props.form.validateFields(err => {
      if (!err) {
        return;
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Card title="Test&Sample">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Demo">
            {getFieldDecorator('project', {
              initialValue: {
                from: 1,
                to: 100,
              },
              rules: [getComplexSame('from', 'to')],
            })(
              <MultipleFormElement>
                <Input key="from" />
                <span>~</span>
                <InputNumber className="w-full" key="to" />
              </MultipleFormElement>,
            )}
          </Form.Item>
          <Form.Item label="Demo">
            {getFieldDecorator('fff', {
              initialValue: null,
              rules: [required, getRange(1, 10)],
            })(<Input />)}
          </Form.Item>
          <Button htmlType="submit">提交</Button>
        </Form>
      </Card>
    );
  }
}
