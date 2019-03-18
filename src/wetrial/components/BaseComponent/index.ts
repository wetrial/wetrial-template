import React from 'react';
// import * as router from "react-router";
import { WrappedFormUtils } from 'antd/es/form/Form';
// import { FormComponentProps } from "antd/lib/form";
import { match } from 'react-router';
import { Dispatch } from 'redux';

/**
 * 基础属性
 */
export interface IProps extends React.HTMLAttributes<HTMLDivElement>{
  dispatch?: Dispatch<any>;
  form?: WrappedFormUtils;
  match?: match;
}


export class Component<P = {}, S = {}> extends React.Component<P & IProps, S> { }

export class PureComponent<P = {}, S = {}> extends React.PureComponent<P & IProps,S> { }

// /**
//  * 通用组件属性接口
//  */
// export interface IComponentProps extends router.RouteComponentProps {
//   children?:React.ReactNode;
//   dispatch?:Dispatch<any>;
// }

// /**
// * Form组件属性接口
// */
// export interface IFormComponentProps extends IComponentProps,FormComponentProps{

// }