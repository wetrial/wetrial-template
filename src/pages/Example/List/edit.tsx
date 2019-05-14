import React from 'react';
import { PureComponent,backRouter } from '@/wetrial';
import { Form, Input, Button, Checkbox, Row, Col, PageHeader } from 'antd';
import { connect } from 'dva';
import { FORM_SINGLE_LAYOUT } from '@/constants';
import { required, getRegex, getRange } from '@/wetrial/validation';

const FormItem = Form.Item;

@connect(({ example_tenant: { model }, loading }) => ({
  model,
  submitting: loading.effects['example_tenant/saveTenant'],
}))
@Form.create()
class Edit extends PureComponent<any> {
  componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;
    dispatch({
      type: 'example_tenant/getTeannt',
      payload: { id: params.id },
    });
  }

  handleSave = () => {
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'example_tenant/createTenant',
          payload: values,
        }); // .then(() => {});
      }
    });
  };

  resetForm = () => {
    const { form } = this.props;
    form.resetFields();
  };

  render() {
    const {
      submitting,
      form: { getFieldDecorator },
      model,
    } = this.props;
    return (
      <PageHeader
        onBack={() => {
          backRouter('/example/list');
        }}
        title={model.id ? '编辑租户' : '添加租户'}
      >
        <Form>
          <FormItem {...FORM_SINGLE_LAYOUT} label="租户编码">
            {getFieldDecorator('tenancyName', {
              initialValue: model.tenancyName,
              rules: [
                required,
                {
                  ...getRegex('^[a-zA-Z][a-zA-Z0-9_-]{1,}$'),
                  message: '租户名称必须由2个以上字母、数字、-、_组成,以字母开头',
                },
              ],
            })(<Input autoComplete="off" />)}
          </FormItem>
          <FormItem {...FORM_SINGLE_LAYOUT} label="名称">
            {getFieldDecorator('name', {
              initialValue: model.name,
              rules: [required, getRange(1, 20)],
            })(<Input autoComplete="off" />)}
          </FormItem>
          <FormItem {...FORM_SINGLE_LAYOUT} colon={false} label="&nbsp;">
            {getFieldDecorator('isActive', {
              valuePropName: 'checked',
              initialValue: model.isActive,
            })(<Checkbox>激活</Checkbox>)}
          </FormItem>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              <Button className="m-l-sm" onClick={this.resetForm}>
                重置
              </Button>
              <Button
                style={{ marginLeft: 20 }}
                type="primary"
                htmlType="submit"
                loading={submitting}
              >
                保存
              </Button>
            </Col>
          </Row>
        </Form>
      </PageHeader>
    );
  }
}

export default Edit;
