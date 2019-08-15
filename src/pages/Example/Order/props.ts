import { IPagedListProps,IFormComponentProps } from '@/types'
/**
 * order state 参数类型
 */
export interface IOrderState {

}

/**
 * order props 参数类型
 */
export interface IOrderProps extends IPagedListProps {

}
/**
 * order edit state 参数类型
 */
export interface IOrderEditState {

}

/**
 * order edit props 参数类型
 */
export interface IOrderEditProps extends IFormComponentProps {
    submitting?:boolean;
    model:{[key:string]:any }
}