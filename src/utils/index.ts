import { reduce } from 'lodash';
import { IKeyValue } from '@wetrial/core/types';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

/**
 * 将数组对象转换成object对象
 * @param items 要转换的数组
 * @param key 作为key的属性名
 * @param value  作为值的属性名
 * @example  convertListToFlat([{label:'label1',value:'001'},{label:'label2',value:'002'}],'value','label')==>{'001':'label1','002':'label2'}
 * @returns IKeyValue
 * @summary 建议配合memoize方法使用避免不必要的转换，提高性能
 */
export function convertListToFlat<T>(items: T[], key: keyof T, text: keyof T): IKeyValue<keyof T> {
  return reduce(
    items,
    (redu: IKeyValue<keyof T>, item) => {
      const reduKey = item[key];
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      redu[reduKey] = item[text];
      return redu;
    },
    {},
  );
}
