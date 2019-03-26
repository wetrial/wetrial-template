import React from 'react';
import { FormComponentProps } from "antd/lib/form";
import { match } from 'react-router';
import { Dispatch } from 'redux';

/**
 * 基础属性
 */
export interface IProps extends React.HTMLAttributes<HTMLDivElement>{
  dispatch?: Dispatch<any>;
  match?: match;
}
export class Component<P = {}, S = {}> extends React.Component<P & IProps, S> { }
export class PureComponent<P = {}, S = {}> extends React.PureComponent<P & IProps,S> {}

/**
 * 表单属性
 */
export interface FormProps extends IProps,FormComponentProps{}
export class FormComponent<P = {}, S = {}> extends React.PureComponent<P & FormProps,S> {}
