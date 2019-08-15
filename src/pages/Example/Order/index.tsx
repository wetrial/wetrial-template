
import { ColumnProps } from 'antd/lib/table';
import React, { Fragment } from 'react';
import { connect } from 'dva';
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

import { IOrderProps, IOrderState } from './props'
    
@connect(({ example_order:{pagedData},loading }) => ({
    pagedData,
    loading:loading.effects['example_order/getPagedList']
}))
// @ts-ignore
@Form.create()
@withPagedQuery({ type: 'example_order/getPagedList' })
class Order extends FormComponent<IOrderProps,IOrderState,any> {
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
                <Authorized authority={'test'}>
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
                <Authorized authority={'test'}>
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
        //   pathname: `/${id}`,
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
export default Order
