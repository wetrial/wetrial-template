const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/gi;

// https://github.com/moment/moment/issues/3650
export function interopDefault(m: any) {
  return m.default || m;
}

export function urlToList(url: string) {
  const urlList = url.split('/').filter(i => i);
  return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`);
}

/**
 * 判断对象是否是Promise类型
 * @param {any} obj 要判断的对象
 * @returns {boolean} 如果是 返回true，否则 false
 */
export function isPromise(obj: any): boolean {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

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
export function includes<T extends string | number>(values: T[], searchs: T[] | T): boolean {
  let result = false;
  if (Array.isArray(searchs)) {
    result = values.some(item => (searchs as T[]).includes(item));
  } else {
    result = values.includes(searchs as T);
  }
  return result;
}
