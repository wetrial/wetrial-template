import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, InputNumber } from 'antd';
import React, { useState } from 'react';
import {
  SchemaForm,
  // SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormEffectHooks,
} from '@formily/antd';

import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  // NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating,
  // FormItemGrid,
  // FormTextBox,
  // FormCard,
  // FormBlock,
  // FormLayout,
} from '@formily/antd-components'; // 或者@formily/next-components

const components = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
  TextArea: Input.TextArea,
  NumberPicker: InputNumber,
  Select,
  Switch,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker,
  YearPicker: DatePicker.YearPicker,
  MonthPicker: DatePicker.MonthPicker,
  WeekPicker: DatePicker.WeekPicker,
  TimePicker,
  Upload,
  Range,
  Rating,
  Transfer,
};

export const schemaConfig = {
  type: 'object',
  properties: {
    NO_NAME_FIELD_$0: {
      key: 'NO_NAME_FIELD_$0',
      type: 'object',
      name: 'NO_NAME_FIELD_$0',
      'x-component': 'card',
      'x-component-props': {
        title: '基本信息',
      },
      properties: {
        aaa: {
          key: 'aaa',
          name: 'aaa',
          type: 'string',
          title: '字段1',
          'x-component': 'input',
        },
        bbb: {
          key: 'bbb',
          name: 'bbb',
          type: 'number',
          title: '控制详细信息显示隐藏',
          enum: [
            {
              value: true,
              label: '显示',
            },
            {
              value: false,
              label: '隐藏',
            },
          ],
          default: true,
          'x-component': 'select',
        },
        ccc: {
          key: 'ccc',
          name: 'ccc',
          type: 'date',
          title: '字段3',
          'x-component': 'datepicker',
        },
      },
    },
    detailCard: {
      key: 'detailCard',
      type: 'object',
      name: 'detailCard',
      'x-component': 'card',
      'x-component-props': {
        title: '详细信息',
      },
      properties: {
        NO_NAME_FIELD_$1: {
          key: 'NO_NAME_FIELD_$1',
          type: 'object',
          name: 'NO_NAME_FIELD_$1',
          'x-component': 'layout',
          'x-component-props': {
            labelCol: 8,
            wrapperCol: 12,
          },
          properties: {
            NO_NAME_FIELD_$2: {
              key: 'NO_NAME_FIELD_$2',
              type: 'object',
              name: 'NO_NAME_FIELD_$2',
              'x-component': 'grid',
              'x-component-props': {
                title: '字段3',
                gutter: 10,
                cols: [6, 11],
              },
              properties: {
                ddd: {
                  key: 'ddd',
                  name: 'ddd',
                  type: 'number',
                  'x-component': 'numberpicker',
                },
                eee: {
                  key: 'eee',
                  name: 'eee',
                  type: 'date',
                  'x-component': 'datepicker',
                },
              },
            },
            mmm: {
              key: 'mmm',
              type: 'object',
              name: 'mmm',
              title: '对象字段',
              properties: {
                NO_NAME_FIELD_$3: {
                  key: 'NO_NAME_FIELD_$3',
                  type: 'object',
                  name: 'NO_NAME_FIELD_$3',
                  'x-component': 'grid',
                  'x-component-props': {
                    gutter: 10,
                    cols: [6, 11],
                  },
                  properties: {
                    ddd1: {
                      key: 'ddd1',
                      name: 'ddd1',
                      default: 123,
                      type: 'number',
                      'x-component': 'numberpicker',
                    },
                    '[startDate,endDate]': {
                      key: '[startDate,endDate]',
                      name: '[startDate,endDate]',
                      type: 'daterange',
                      'x-component': 'daterangepicker',
                    },
                  },
                },
              },
            },
          },
        },
        NO_NAME_FIELD_$4: {
          key: 'NO_NAME_FIELD_$4',
          type: 'object',
          name: 'NO_NAME_FIELD_$4',
          'x-component': 'layout',
          'x-component-props': {
            labelCol: 8,
            wrapperCol: 16,
          },
          properties: {
            NO_NAME_FIELD_$5: {
              key: 'NO_NAME_FIELD_$5',
              type: 'object',
              name: 'NO_NAME_FIELD_$5',
              'x-component': 'text-box',
              'x-component-props': {
                title: '文本串联',
                text: '订%s元/票 退%s元/票 改%s元/票',
                gutter: 8,
              },
              properties: {
                aa1: {
                  key: 'aa1',
                  type: 'string',
                  default: 10,
                  required: true,
                  name: 'aa1',
                  'x-props': {
                    style: {
                      width: 80,
                    },
                  },
                  description: '简单描述',
                  'x-component': 'input',
                },
                aa2: {
                  key: 'aa2',
                  type: 'number',
                  default: 20,
                  required: true,
                  name: 'aa2',
                  description: '简单描述',
                  'x-component': 'numberpicker',
                },
                aa3: {
                  key: 'aa3',
                  type: 'number',
                  default: 30,
                  required: true,
                  name: 'aa3',
                  description: '简单描述',
                  'x-component': 'numberpicker',
                },
              },
            },
          },
        },
        aas: {
          key: 'aas',
          name: 'aas',
          type: 'string',
          title: '字段4',
          'x-component': 'input',
        },
        NO_NAME_FIELD_$6: {
          key: 'NO_NAME_FIELD_$6',
          type: 'object',
          name: 'NO_NAME_FIELD_$6',
          'x-component': 'block',
          'x-component-props': {
            title: '区块',
          },
          properties: {
            ddd2: {
              key: 'ddd2',
              name: 'ddd2',
              type: 'string',
              title: '字段5',
              'x-component': 'input',
              // required: true,
              // 'x-props': {
              //   addonAfter: 'test',
              //   addonBefore: 'xxx',
              //   itemStyle: {},
              //   itemClassName: '',
              //   triggerType: 'onBlur',
              // },
            },
            eee2: {
              key: 'eee2',
              name: 'eee2',
              type: 'string',
              title: '字段6',
              'x-component': 'input',
            },
          },
        },
      },
    },
    custom: {
      key: 'custom',
      name: 'custom',
      type: 'object',
      title: '{{customTitle}}',
      description: '{{customDescription}}',
      'x-component-props': {
        placeholder: '{{customPlaceholder}}',
      },
    },
  },
};

export default () => {
  const [state, setState] = useState({ editable: true });
  return (
    <PageContainer breadcrumb={undefined} ghost={false}>
      <Card className="page-body">
        <SchemaForm
          editable={state.editable}
          labelCol={8}
          wrapperCol={6}
          components={components}
          schema={schemaConfig}
          effects={({ setFieldState }) => {
            FormEffectHooks.onFieldValueChange$('bbb').subscribe(({ value }) => {
              setFieldState('detailCard', (fState) => {
                // eslint-disable-next-line no-param-reassign
                fState.visible = value;
              });
            });
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          expressionScope={{
            customTitle: 'this is custom title',
            customDescription: 'this is custom description',
            customPlaceholder: 'this is custom placeholder',
          }}
        >
          <FormButtonGroup sticky>
            <Submit>提交</Submit>
            <Button type="primary" onClick={() => setState({ editable: !state.editable })}>
              {state.editable ? '详情' : '编辑'}
            </Button>
            <Reset>重置</Reset>
          </FormButtonGroup>
        </SchemaForm>
      </Card>
    </PageContainer>
  );
};

// const html = (
//   <React.Fragment>
//     <FormCard title="基本信息">
//       <Field name="aaa" type="string" title="字段1" x-component="Input" />
//       <Field
//         name="bbb"
//         type="number"
//         title="控制详细信息显示隐藏"
//         enum={[
//           { value: true, label: '显示' },
//           { value: false, label: '隐藏' },
//         ]}
//         default
//         x-component="Select"
//         x-component-props={{
//           placeholder: '-- 请选择 --',
//           allowClear: true,
//         }}
//       />
//       <Field name="ccc" type="date" title="字段3" x-component="DatePicker" />
//     </FormCard>
//     <FormCard title="详细信息" name="detailCard">
//       <FormLayout labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
//         <FormItemGrid title="字段3" gutter={10} cols={[6, 11]}>
//           <Field name="ddd" type="number" x-component="NumberPicker" />
//           <Field name="eee" type="date" x-component="DatePicker" />
//         </FormItemGrid>
//         <Field type="object" name="mmm" title="对象字段">
//           <FormItemGrid gutter={10} cols={[6, 11]}>
//             <Field name="ddd1" default={123} type="number" x-component="NumberPicker" />
//             <Field name="[startDate,endDate]" type="daterange" x-component="DateRangePicker" />
//           </FormItemGrid>
//         </Field>
//       </FormLayout>
//       <FormLayout labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
//         <FormTextBox title="文本串联" text="订%s元/票 退%s元/票 改%s元/票" gutter={8}>
//           <Field
//             type="string"
//             default={10}
//             required
//             name="aa1"
//             x-props={{ style: { width: 80 } }}
//             description="简单描述"
//             x-component="Input"
//           />
//           <Field
//             type="number"
//             default={20}
//             required
//             name="aa2"
//             description="简单描述"
//             x-component="NumberPicker"
//           />
//           <Field
//             type="number"
//             default={30}
//             required
//             name="aa3"
//             description="简单描述"
//             x-component="NumberPicker"
//           />
//         </FormTextBox>
//       </FormLayout>
//       <Field name="aas" type="string" title="字段4" x-component="Input" />
//       <FormBlock title="区块">
//         <Field name="ddd2" type="string" title="字段5" x-component="Input" />
//         <Field
//           name="eee2"
//           type="string"
//           title="字段6"
//           x-component="Input"
//           // x-render={(a, b, c, d, e) => {
//           //   debugger;
//           //   return <div>xxx</div>;
//           // }}
//         />
//       </FormBlock>
//     </FormCard>
//   </React.Fragment>
// );
