import { PageContainer } from '@ant-design/pro-layout';
import { FormButtonGroup, Reset, SchemaForm, Submit } from '@formily/antd';
import { FormMegaLayout } from '@formily/antd-components';
import { Card, Input, Upload } from 'antd';
import { ProSelect, ProRadio } from '@wetrial/component';
import React from 'react';

const ProRadioGroup = ProRadio.Group;

// 需要用到的组件列表
const components = {
  Input,
  ProSelect,
  ProRadioGroup,
  TextArea: Input.TextArea,
  Upload,
  FormMegaLayout,
};

// 配置
const schemaConfig = {
  type: 'object',
  properties: {
    NO_NAME_FIELD_$1: {
      key: 'NO_NAME_FIELD_$1',
      type: 'object',
      name: 'NO_NAME_FIELD_$1',
      'x-component': 'mega-layout',
      'x-component-props': {
        grid: true,
        labelWidth: 120,
        labelAlign: 'right',
        // addonBefore: '容器before',
        // addonAfter: '容器after',
        // description: '容器description',
        full: true,
        autoRow: true,
        responsive: {
          xxl: 2,
          lg: 2,
          m: 2,
          s: 1,
        },
      },
      'x-mega-props': {},
      properties: {
        'user.name': {
          type: 'string',
          title: 'Name',
          required: true,
          'x-component': 'Input',
          'x-mega-props': {
            span: 2,
          },
        },
        'user.generator': {
          type: 'string',
          title: '性别',
          'x-component': 'ProRadioGroup',
          'x-component-props': {
            options: [
              { value: 'C#', label: 'C#' },
              { value: 'react', label: 'react' },
            ],
          },
          'x-mega-props': {
            // addonBefore: '组件before',
            // addonAfter: '组件after',
          },
          // description: '组件description',
        },
        'user.love': {
          type: 'string',
          title: 'Age',
          'x-component': 'ProSelect',
          'x-component-props': {
            allowClear: true,
            list: [
              { key: 'C#', label: 'C#' },
              { key: 'react', label: 'react' },
            ],
          },
          'x-mega-props': {},
        },
        info: {
          type: 'string',
          title: 'info',
          'x-component': 'TextArea',
          'x-mega-props': {
            span: 2,
          },
          'x-component-props': {
            autoSize: {
              minRows: 2,
              maxRows: 6,
            },
            allowClear: true,
          },
        },
      },
    },
  },
};

export default () => {
  return (
    <PageContainer breadcrumb={undefined} ghost={false}>
      <Card className="page-body">
        <SchemaForm
          components={components}
          onSubmit={(values) => {
            console.log(values);
          }}
          // labelCol={5}
          // wrapperCol={19}
          schema={schemaConfig}
        >
          <FormButtonGroup sticky>
            <Submit>查询</Submit>
            <Reset>重置</Reset>
          </FormButtonGroup>
        </SchemaForm>
      </Card>
    </PageContainer>
  );
};
