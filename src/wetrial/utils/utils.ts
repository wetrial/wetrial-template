import { some, isArray } from "lodash";

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/gi;

/**
 * 判断给定的字符串是否是个url地址
 * @param path 地址
 * @returns {boolean} 如果是 返回 true，否则 false
 */
export function isUrl(path: string) {
    return reg.test(path);
}

/**
 * 从指定数组中查询是否存在要搜索的值
 * @param values 要查询的数组
 * @param search 要搜索的值
 */
export function includes<T extends string | number>(values: T[], searchs: T[]|T): boolean {
    let result = false;
    if (isArray(searchs)) {
        result = some(values, item => (searchs as T[]).includes(item));
    } else {
        result = values.includes(searchs as T);
    }
    return result;
}

export default {
    isUrl,
    includes
}