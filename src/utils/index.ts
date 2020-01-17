import { parse, stringify } from 'qs';
import { mapValues, isString } from 'lodash';
import moment from 'moment';
import { BASE_PATH } from '../constants';
import { IKeyValue } from '@wetrial/core/es/kernel/types';

/**
 * 解析url后的查询字符串并转化成object对象
 * @param data 要解析的字符串，没有则默认使用location.href
 */
export function getQuery(data?: string): { [key: string]: string } {
  const url = data || window.location.href.split('?')[1];
  return parse(url);
}

/**
 * 根据url获取redirect地址(如果是相同origin的则获取路由地址)
 * @param defaultPath 如果没有则使用的默认
 */
export function getRedirect(defaultPath: string = '/') {
  const urlParams = new URL(window.location.href);
  const params = getQuery();
  let { redirect } = params;
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1);
      }
    }
  }
  return redirect || defaultPath;
}

/**
 * 根据对象获取对象中的字符串值
 * @param obj 要遍历的对象
 * @returns string[]
 */
export function deepGetValue(obj: { [key: string]: any }) {
  const values = new Set();
  mapValues(obj, v => {
    if (isString(v)) {
      values.add(v);
    } else {
      const subValues = deepGetValue(v);
      subValues.forEach(subValue => {
        values.add(subValue);
      });
    }
  });
  return [...values];
}

/**
 *
 * @param {object}
 * @param {moment} param.date
 * @param {string} param.format 格式 默认为年月日
 */
export function getDateString({ date, format = 'Y-MM-DD' }) {
  let tempDate = date;
  if (!tempDate) {
    return '';
  }

  if (typeof tempDate === 'string') {
    tempDate = moment(tempDate);
  }
  if (tempDate) {
    return tempDate.format(format);
  }
  return '';
}

export function fixedZero(val: number): string {
  return val * 1 < 10 ? `0${val}` : `${val}`;
}

/**
 * 下载文件
 * @param file 要下载的文件
 */
export function downloadTempFile(file: { fileName: string; fileType: string; fileToken: string }) {
  window.location.href = `${BASE_PATH}File/DownloadTempFile?${stringify(file)}`;
}

/**
 * 对数据源按key进行相邻行合并，返回生成的跨行对象,建议使用memoizeOne进行缓存调用
 * @param list 要进行合并的数据源列表
 * @param key key
 * @example mergeCells([{name:'xxg',title:'code'},{name:'刘德华',title:'code'},{name:'古天乐',title:'other'}],'title')==>{0:2,1:0,2:1}
 */
export function mergeCells<T>(list: T[], key: string | ((item: T) => string)): IKeyValue {
  const mergeObj = {};
  let startIndex = 0;
  list &&
    list.forEach((item, index, arr) => {
      let curValue;
      let preValue;
      if (typeof key === 'string') {
        curValue = item[key];
        preValue = arr[startIndex][key];
      } else {
        curValue = key(item);
        preValue = key(arr[startIndex]);
      }
      mergeObj[index] = 0;
      if (curValue === preValue) {
        mergeObj[startIndex] += 1;
      } else {
        mergeObj[index] = 1;
        startIndex = index;
      }
    });
  return mergeObj;
}
