import React from 'react';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { match } from 'react-router';
import { Dispatch } from 'redux';

export interface IProps {
  dispatch?: Dispatch<any>;
  form?: WrappedFormUtils;
  match?: match;
}

export class Component<P = {}, S = {}> extends React.Component<P & IProps, S> { }

export class PureComponent<P = {}, S = {}> extends React.PureComponent<P & IProps,S> { }
