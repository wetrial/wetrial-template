const fs = require('fs');

/**
 * 根据配置生成页面
 * @param {object} option 配置项
 * @param {string} option.pageName 名称
 * @param {string} option.pagePath 页面路径
 */
function generate(option) {
  const { pageName, pagePath } = option;
  let modelNamespace = pageName;
  if (pagePath) {
    modelNamespace = `${pagePath.replace('/', '_')}_${pageName}`;
  }
  // 处理首字母小写的问题
  modelNamespace = modelNamespace
    .split('_')
    .map(item => item.substring(0, 1).toLocaleLowerCase() + item.substring(1))
    .join('_');

  const PascalPageName = pageName.substring(0, 1).toUpperCase() + pageName.substr(1);

  const pageTemplate = `
import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, PageHeader } from 'antd';
import { connect } from 'umi';
import { FormComponent, backRouter } from 'wetrial';
import { required, getRegex, getRange } from '@wetrial/validation';
import { FORM_SINGLE_LAYOUT } from '@/constants';
import Authorized from '@/utils/Authorized'
// import Permissions from '@config/permissions';

const FormItem = Form.Item;

import { I${PascalPageName}EditProps, I${PascalPageName}EditState } from './props'
// import styles from './edit.less'

@connect(({ ${modelNamespace}:\{model\},loading }) => ({
    model,
    loading:loading.effects['${modelNamespace}/get']
}))
// @ts-ignore
@Form.create()
class ${PascalPageName}Edit extends FormComponent<I${PascalPageName}EditProps,I${PascalPageName}EditState> {
    componentDidMount() {
        const {
          dispatch,
          match: { params },
        } = this.props;
        dispatch({
          type: '${modelNamespace}/get',
          payload: { id: params.id },
        });
      }

      handleSave = () => {
        const { dispatch, form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            dispatch({
              type: '${modelNamespace}/save',
              payload: values,
            }).then(() => {
                // TODO 路由跳转等
            });
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
               // TODO 回退到列表页面等逻辑操作
              // backRouter('/example/list');
            }}
            title={model.id ? '编辑xxx' : '添加xxx'}
          >
            <Form>
              <FormItem {...FORM_SINGLE_LAYOUT} label="租户编码">
                {getFieldDecorator('tenancyName', {
                  initialValue: model.tenancyName,
                  rules: [
                    required,
                    {
                      ...getRegex('^[a-zA-Z][a-zA-Z0-9_-]{1,}$'),
                      message:
                        '租户名称必须由2个以上字母、数字、-、_组成,以字母开头',
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
                  <Authorized authority={'//TODO页面权限'}>
                    <Button
                        style={{ marginLeft: 20 }}
                        type="primary"
                        htmlType="submit"
                        loading={submitting}
                    >
                        保存
                    </Button>
              </Authorized>
                </Col>
              </Row>
            </Form>
          </PageHeader>
        );
      }
}
export default ${PascalPageName}Edit`;

  // scss 模板
  const lessTemplate = `@import '~themes/index.less';
.container{

}`;

  const utils = require('./utils');

  const ParcalPath = pagePath
    .split('/')
    .map(item => item.substring(0, 1).toUpperCase() + item.substr(1))
    .join('/');

  // 检测目录、文件是否存在,存在跳过生成
  const folderFullPath = `./src/pages/${pagePath ? ParcalPath + '/' : ''}${PascalPageName}`;

  // 检测是否有model、props、service等文件
  const baseFileExists = utils.checkExists(
    `${folderFullPath}/service.ts`,
    `${folderFullPath}/model.ts`,
    `${folderFullPath}/props.ts`,
  );
  if (!baseFileExists) {
    console.log('编辑页面依赖index页面，请先生成index页面....');
    process.exit(0);
  }

  const exists = utils.checkExists(
    `${folderFullPath}/edit.tsx`,
    // `${folderFullPath}/edit.less`
  );
  if (exists) {
    console.log('检测到已经存在部分文件，生成操作已经取消....');
    process.exit(0);
  }

  fs.mkdirSync(folderFullPath, { recursive: true }); // mkdir $1
  process.chdir(folderFullPath); // cd $1

  fs.writeFileSync(`edit.tsx`, pageTemplate); //tsx
  // fs.writeFileSync(`edit.less`, lessTemplate); // scss
  process.exit(0);
}

module.exports = {
  generate: generate,
};
