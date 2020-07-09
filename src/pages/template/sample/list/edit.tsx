import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams, history } from 'umi';
import { Form, Row, Col, Input, Switch, Slider, Button, Skeleton } from 'antd';
import { useRequest } from 'ahooks';
import { activeCache } from '@wetrial/hooks';
import { LAYOUT_FORM_SINGLE, LAYOUT_FORM_TWO, LAYOUT_COL_TWO } from '@/constants';
import { getItem, create, update } from './service';

export default () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const { run: getModel, data, loading } = useRequest(getItem, {
    refreshDeps: [id],
    manual: true,
  });

  const { run, loading: submitting } = useRequest(id ? update : create, {
    manual: true,
    refreshDeps: [id],
  });

  useEffect(() => {
    id && getModel({ id });
  }, [id]);

  const handleBack = () => {
    const listPath = '/template/sample/list';
    activeCache(listPath);
    history.push(listPath);
  };

  const handleSubmit = (values) => {
    run(values).then((result) => {
      !id && history.push(`/template/sample/list/edit/${result.id}`);
    });
  };
  return (
    <Skeleton active loading={loading}>
      <PageContainer
        breadcrumb={undefined}
        ghost={false}
        title={id ? '编辑信息' : '新增信息'}
        onBack={handleBack}
        // extra={[
        //   <Button key="cancel" form="info" type="default" htmlType="reset" onClick={handleBack}>
        //     取消
        //   </Button>,
        //   <Button key="save" form="info" loading={submitting} type="primary" htmlType="submit">
        //     提交
        //   </Button>,
        // ]}
        footer={[
          <Button key="cancel" form="info" type="default" htmlType="reset" onClick={handleBack}>
            取消
          </Button>,
          <Button key="submit" form="info" loading={submitting} type="primary" htmlType="submit">
            提交
          </Button>,
        ]}
      >
        <Form
          {...LAYOUT_FORM_TWO}
          scrollToFirstError
          form={form}
          name="info"
          initialValues={data}
          onFinish={handleSubmit}
        >
          <Row>
            <Col {...LAYOUT_COL_TWO}>
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, whitespace: true, max: 20 }]}
              >
                <Input allowClear autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...LAYOUT_COL_TWO}>
              <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, whitespace: true, max: 64 }]}
              >
                <Input allowClear autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...LAYOUT_FORM_SINGLE}
                label="描述"
                name="desc"
                rules={[{ max: 1000, type: 'string' }]}
              >
                <Input.TextArea allowClear autoSize autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...LAYOUT_COL_TWO}>
              <Form.Item label="状态" name="status" valuePropName="checked">
                <Switch checkedChildren="启用" unCheckedChildren="禁用" />
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
              <Form.Item label="国家" name={['address', 'state']} rules={[{ max: 20 }]}>
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...LAYOUT_COL_TWO}>
              <Form.Item label="详细地址" name={['address', 'street']} rules={[{ max: 200 }]}>
                <Input allowClear autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row />
        </Form>
      </PageContainer>
    </Skeleton>
  );
};
