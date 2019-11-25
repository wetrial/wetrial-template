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
import { ColumnProps } from 'antd/lib/table';
import React, { Fragment } from 'react';
import { connect } from 'dva';
// import { router } from 'umi';
import {
    Form,
    Row,
    Col,
    Button,
    Card,
    Input,
    Popconfirm,
    Divider,
    Select,
} from 'antd';
import { FormComponent, withPagedQuery } from 'wetrial';
import TableList from '@/components/TableList';
import Authorized from '@/utils/Authorized';
import Permissions from '@config/permissions';
import { getDateString } from '@/utils';

const FormItem = Form.Item;

import { I${PascalPageName}Props, I${PascalPageName}State } from './props'
// import styles from './index.less'

@connect(({ ${modelNamespace}:\{pagedData\},loading }) => ({
    pagedData,
    loading:loading.effects['${modelNamespace}/getPagedList']
}))
// @ts-ignore
@Form.create()
@withPagedQuery({ type: '${modelNamespace}/getPagedList' })
class ${PascalPageName} extends FormComponent<I${PascalPageName}Props,I${PascalPageName}State > {
    columns: ColumnProps<any>[] = [
        {
            title: '创建时间',
            dataIndex: 'creationTime',
            render: value => {
                return getDateString({ date: value, format: 'Y-MM-DD H:m' });
            },
        },
        {
            title: '操作',
            dataIndex: 'operator',
            fixed: 'right',
            width: 150,
            render: (_, record) => {
            return (
                <Fragment>
                <Authorized authority={null}>
                    <Button
                    size="small"
                    onClick={() => {
                        this.handleCreateOrEdit(record.id);
                    }}
                    type="primary"
                    >
                    编辑
                    </Button>
                </Authorized>
                <Authorized authority={null}>
                    <Divider type="vertical" />
                    <Popconfirm title="确定删除">
                    <Button size="small" type="danger">
                        删除
                    </Button>
                    </Popconfirm>
                </Authorized>
                </Fragment>
            );
            },
        },
        ];

        // getQueryParams = () => {
        //   return {};
        // };

        handleSearch = e => {
        e.preventDefault();
        const { form, onSearchData } = this.props;
        form.validateFields((err, values) => {
            if (err) {
            return;
            }
            onSearchData(values);
        });
        };

        handleCreateOrEdit = id => {
        // router.push({
        //   pathname: \`/\${id}\`,
        // });
        console.log(id);
        };

        renderForm = () => {
        const {
            form: { getFieldDecorator },
            onResetData,
            filterData,
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch}>
            <Row gutter={5}>
                <Col xxl={{span:4}} xl={{span:6}} lg={{span:12}} sm={24} xs={24}>
                <FormItem>
                    {getFieldDecorator('filter', {
                    initialValue: filterData.filter,
                    })(<Input autoComplete="off" placeholder="输入以搜索" />)}
                </FormItem>
                </Col>
                <Col xxl={{span:4}} xl={{span:6}} lg={{span:12}} sm={24} xs={24}>
                <FormItem>
                    {getFieldDecorator('type', {
                    initialValue: filterData.type,
                    })(
                    <Select placeholder="请选择">
                        <Select.Option value="1">vip</Select.Option>
                        <Select.Option value="2">普通</Select.Option>
                    </Select>,
                    )}
                </FormItem>
                </Col>
                <Col xxl={{span:16}} xl={{span:12}} lg={{span:24}} sm={{ span: 24 }} xs={{span:24}}>
                <FormItem>
                    <Row type="flex" align="middle" justify="space-between">
                    <div>
                        <Button type="primary" onClick={this.handleSearch}>
                        查询
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={onResetData}>
                        重置
                        </Button>
                    </div>
                    <Authorized authority={Permissions.example.list}>
                        <Button
                        type="primary"
                        icon="plus"
                        onClick={this.handleCreateOrEdit.bind(this,'')}
                        >
                        创建
                        </Button>
                    </Authorized>
                    </Row>
                </FormItem>
                </Col>
            </Row>
            </Form>
        );
        };

        render() {
        const {
            pagination,
            onTableChange,
            sorter,
            loading,
            pagedData,
        } = this.props;
        return (
            <Card>
            {this.renderForm()}
            <TableList
                loading={loading}
                columns={this.columns}
                dataSource={pagedData.items}
                onChange={onTableChange}
                sorter={sorter}
                pagination={{
                total: pagedData.total,
                ...pagination,
                }}
            />
            </Card>
        );
        }
}
export default ${PascalPageName}
`;

  // scss 模板
  const lessTemplate = `@import '~themes/index.less';
.container{

}`;

  // model 模板
  const modelTemplate = `import extendModel from '@wetrial/model';
import { GetPagedList } from './service';

export default extendModel({
namespace: '${modelNamespace}',
state: {
    pagedData: {},
    // model: {},
},
effects: {
    *getPagedList({ payload }, { call, put }) {
    const pagedData = yield call(GetPagedList, payload);
    yield put({
        type: 'update',
        payload: {
        pagedData
        },
    });
    }
},
});`;
  // 接口模板
  const serviceTemplate = `import { get,post } from '@/utils/request';
import { API_PREFIX } from '@/constants';

export async function GetPagedList(data){
    return await get({
        url:\`\${API_PREFIX}${PascalPageName}/GetPagedList\`,
        data
    });
}

export async function create(data){
    return await post({
        url:\`\${API_PREFIX}${PascalPageName}/Create\`,
        data
    });
}`;

  // 属性模板
  const interfaceTemplate = `import { IConnectProps, IFormProps, IKeyValue } from '@wetrial/types';
  import { IWithPagedQueryProps } from '@wetrial/components/withPagedQuery';


/**
 * ${pageName} props 参数类型
 */
export interface I${PascalPageName}Props extends IFormProps, IWithPagedQueryProps{

}

/**
 * ${pageName} state 参数类型
 */
export interface I${PascalPageName}State extends IFormProps {

}

/**
 * ${pageName} edit state 参数类型
 */
export interface I${PascalPageName}EditState  {

}

/**
 * ${pageName} edit props 参数类型
 */
export interface I${PascalPageName}EditProps extends IFormProps{
    submitting?:boolean;
    model:{[key:string]:any}
}`;

  const ParcalPath = pagePath
    .split('/')
    .map(item => item.substring(0, 1).toUpperCase() + item.substr(1))
    .join('/');
  // 检测目录、文件是否存在,存在跳过生成
  const folderFullPath = `./src/pages/${pagePath ? ParcalPath + '/' : ''}${PascalPageName}`;
  const utils = require('./utils');
  const exists = utils.checkExists(
    `${folderFullPath}/index.tsx`,
    // `${folderFullPath}/index.less`,
    `${folderFullPath}/service.ts`,
    `${folderFullPath}/model.ts`,
    `${folderFullPath}/props.ts`,
  );
  if (exists) {
    console.log('检测到已经存在部分文件，生成操作已经取消....');
    process.exit(0);
  }

  fs.mkdirSync(folderFullPath, { recursive: true }); // mkdir $1
  process.chdir(folderFullPath); // cd $1

  fs.writeFileSync(`index.tsx`, pageTemplate); //tsx
  // fs.writeFileSync(`index.less`, lessTemplate); // scss
  fs.writeFileSync('service.ts', serviceTemplate); // service
  fs.writeFileSync('model.ts', modelTemplate); // model
  fs.writeFileSync(`props.ts`, interfaceTemplate); // interface
  process.exit(0);
}

module.exports = {
  generate: generate,
};
