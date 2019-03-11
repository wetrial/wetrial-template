import React, { PureComponent} from 'react';
import {Link} from 'umi';
import { IFormComponentProps } from "@/bases";
import { connect } from 'dva';
import { Form } from "antd";


interface IIndexProps extends IFormComponentProps{
  productId:number
}

@connect(({global})=>({
  global
}))
class Index extends PureComponent<IIndexProps> {
  render() {
    // const {productId}=this.props;
    // const {dispatch}=this.props;
    // const {form}=this.props;
    return (
      <div>
        <Link to="/">返回首页</Link>
        <p>demo index </p>
        <p>demo index </p>
        <p>demo index </p>
        <p>demo index </p>
        <p>demo index </p>
        <p>demo index </p>
        <p>demo index </p>
        <p>demo index </p>
      </div>
    );
  }
}

export default Form.create<IIndexProps>()(Index);
