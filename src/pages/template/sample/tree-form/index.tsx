import { LAYOUT_FORM_SINGLE, LAYOUT_FORM_TWO } from '@/constants';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Row, Tree } from 'antd';
import React from 'react';
import { roles } from './data.json';

export default () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log(values);
  };

  const onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    form.setFieldsValue({
      roles: checkedKeys,
    });
  };

  return (
    <PageContainer
      breadcrumb={undefined}
      ghost={false}
      title="Form表单中使用Tree"
      footer={[
        <Button key="cancel" form="info" type="default" htmlType="reset">
          取消
        </Button>,
        <Button key="submit" form="info" type="primary" htmlType="submit">
          提交
        </Button>,
      ]}
    >
      <Card className="page-body">
        <Form
          {...LAYOUT_FORM_TWO}
          scrollToFirstError
          form={form}
          name="info"
          initialValues={{
            roles: ['role.edit'],
          }}
          onFinish={handleSubmit}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                label="角色"
                {...LAYOUT_FORM_SINGLE}
                valuePropName="checkedKeys"
                name="roles"
              >
                <Tree treeData={roles} onCheck={onCheck} checkable height={200} defaultExpandAll />
              </Form.Item>
            </Col>
          </Row>
          <Row />
        </Form>
      </Card>
    </PageContainer>
  );
};
