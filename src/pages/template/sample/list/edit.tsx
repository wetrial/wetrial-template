import { LAYOUT_COL_TWO, LAYOUT_FIXED_LABEL } from '@/constants';
import { PageContainer } from '@ant-design/pro-layout';
import { activeCache } from '@wetrial/hooks';
import { useRequest } from 'ahooks';
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Slider } from 'antd';
import React, { useEffect } from 'react';
import { history, useParams } from 'umi';
import { LABELS } from './objects';
import type { IGitHubIssue } from './prop.d';
import { create, getItem, update } from './service';

const defaultModal: Partial<IGitHubIssue> = {
  progress: 0,
};

const SAMPLE_USERS = [
  '百里玄策',
  '孙悟空',
  '娜可露露',
  '安其拉',
  '后裔',
  '蔡文姬',
  '猪八戒',
  '赵云',
].map((item) => ({
  label: item,
  value: item,
}));

export default () => {
  const { id } = useParams<{ id }>();
  const [form] = Form.useForm();

  const { run: getModel, data = defaultModal, loading } = useRequest(getItem, {
    refreshDeps: [id],
    manual: true,
  });

  const { run, loading: submitting } = useRequest(id ? update : create, {
    manual: true,
    refreshDeps: [id],
  });

  useEffect(() => {
    id && getModel({ id });
  }, [id, getModel]);

  const handleBack = () => {
    const listPath = '/template/sample/list/index';
    activeCache(listPath);
    history.push(listPath);
  };

  const handleSubmit = (values) => {
    run(values).then((result) => {
      !id && history.push(`/template/sample/list/edit/${result.id}`);
    });
  };

  return (
    <PageContainer
      breadcrumb={undefined}
      ghost={false}
      title={id ? '编辑信息' : '新增信息'}
      fixedHeader
      onBack={handleBack}
      footer={[
        <Button key="cancel" form="info" type="default" htmlType="reset" onClick={handleBack}>
          取消
        </Button>,
        <Button key="submit" form="info" loading={submitting} type="primary" htmlType="submit">
          提交
        </Button>,
      ]}
    >
      <Card className="page-body" loading={loading}>
        <Form
          {...LAYOUT_FIXED_LABEL}
          scrollToFirstError
          form={form}
          name="info"
          initialValues={data}
          onFinish={handleSubmit}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, whitespace: true, max: 128 }]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col {...LAYOUT_COL_TWO}>
              <Form.Item label="标签" name="labels" rules={[{ required: true }]}>
                <Select mode="multiple" options={LABELS} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="内容"
                name="content"
                rules={[{ required: true, whitespace: true, max: 1024 }]}
              >
                <Input.TextArea autoSize={{ minRows: 4, maxRows: 10 }} allowClear />
              </Form.Item>
            </Col>
            <Col {...LAYOUT_COL_TWO}>
              <Form.Item label="进度">
                <Form.Item
                  name="progress"
                  valuePropName="value"
                  style={{ display: 'inline-block', width: 'calc(100% - 45px)' }}
                >
                  <Slider />
                </Form.Item>
                <Form.Item
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.progress !== currentValues.progress
                  }
                  noStyle
                >
                  {({ getFieldValue }) => {
                    return <span className="ant-form-text"> {getFieldValue('progress')}%</span>;
                  }}
                </Form.Item>
              </Form.Item>
            </Col>
            <Col {...LAYOUT_COL_TWO}>
              <Form.Item label="责任人" name="assigner">
                <Select options={SAMPLE_USERS} />
              </Form.Item>
            </Col>
            <Col {...LAYOUT_COL_TWO}>
              <Form.Item label="奖金" name="money">
                <InputNumber
                  className="w-full"
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => (value || '').replace(/\$\s?|(,*)/g, '')}
                  precision={2}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row />
        </Form>
      </Card>
    </PageContainer>
  );
};
