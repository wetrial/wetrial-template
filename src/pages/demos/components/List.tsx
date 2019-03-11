import React, { PureComponent} from 'react';
import {Link} from 'umi';
import { IComponentProps } from "@/bases";
import { connect } from 'dva';

@connect(({global})=>({
  global
}))
class Index extends PureComponent<IComponentProps> {
  render() {
    // const {dispatch}=this.props;
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

export default Index
