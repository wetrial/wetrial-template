import { formatMessage } from 'umi-plugin-react/locale';
import { every, get as depGet } from 'lodash';
import { get } from './request';

/**
 * 必填校验
 */
export const required = {
  required: true,
  message: formatMessage({ id: 'validation.require' }),
};

/**
 * 整数校验
 */
export const integer = {
  type: 'integer',
  message: formatMessage({ id: 'validation.integer' }),
};

/**
 * bool值校验
 */
export const bool = {
  type: 'bool',
  message: formatMessage({ id: 'validation.bool' }),
};

/**
 * float值校验
 */
export const float = {
  type: 'float',
  message: formatMessage({ id: 'validation.float' }),
};

/**
 * url值校验
 */
export const url = {
  type: 'url',
  message: formatMessage({ id: 'validation.url' }),
};
/**
 * email值校验
 */
export const email = {
  type: 'email',
  message: formatMessage({ id: 'validation.email' }),
};

/**
 * 校验复杂类型的数据是否为空
 * @param {array<string>} checkProps
 * @example getObjRequireRules('project.key')
 */
export const getObjRequire = (...checkProps: string[]): object => {
  return {
    validator: (_, value, callback) => {
      if (value) {
        const isValid = every(checkProps, prop => {
          const v = depGet(value, prop);
          const type = typeof v;
          if (type === 'number') {
            return true;
          }
          return !!v;
        });
        if (isValid) {
          callback();
        }
      }
      callback(formatMessage({ id: 'validation.require' }));
    },
  };
};

/**
 * 最大值规则校验
 * @param max 最大值
 */
export const getMax = (max: number, type: 'number' | 'string' = 'string'): object => {
  return {
    validator: (rule, value, callback) => {
      if (value === undefined) {
        callback();
        return;
      }
      rule.max = max;
      rule.type = type;
      if (value.length === 0) {
        callback();
      } else {
        if (rule.type === 'string') {
          if (value.length > rule.max) {
            rule.message =
              rule.message || formatMessage({ id: 'validation.stringMax' }, { max: rule.max });
            callback(new Error(rule.message));
          }
        } else {
          if (Number(value) > rule.max) {
            rule.message =
              rule.message || formatMessage({ id: 'validation.max' }, { max: rule.max });
            callback(new Error(rule.message));
          }
        }
      }
      callback();
    },
  };
};

/**
 * 最小值规则校验
 * @param min 最小值校验
 * @param type 数值类型
 */
export const getMin = (min: number, type: 'number' | 'string' = 'string'): object => {
  return {
    validator: (rule, value, callback) => {
      if (value === undefined) {
        callback();
        return;
      }
      rule.min = min;
      rule.type = type;
      if (value.length === 0) {
        callback();
      } else {
        if (rule.type === 'string') {
          if (value.length < rule.min) {
            rule.message =
              rule.message || formatMessage({ id: 'validation.stringMin' }, { min: rule.min });
            callback(new Error(rule.message));
          }
        } else {
          if (Number(value) < rule.min) {
            rule.message =
              rule.message || formatMessage({ id: 'validation.min' }, { min: rule.min });
            callback(new Error(rule.message));
          }
        }
      }
      callback();
    },
  };
};

/**
 * 范围校验
 * @param min 最小值
 * @param max 最大值
 * @param type 数值类型
 */
export const getRange = (
  min: number,
  max: number,
  type: 'number' | 'string' = 'string'
): object => {
  return {
    validator: (rule, value, callback) => {
      if (value === undefined) {
        callback();
        return;
      }
      rule.min = min;
      rule.max = max;
      rule.type = type;
      if (value.length === 0) {
        callback();
      } else {
        if (rule.type === 'string') {
          if (value.length < rule.min || value.length > rule.max) {
            rule.message =
              rule.message ||
              formatMessage({ id: 'validation.stringRange' }, { min: rule.min, max: rule.max });
            callback(new Error(rule.message));
          }
        } else {
          if (Number(value) < rule.min || Number(value) > rule.max) {
            rule.message =
              rule.message ||
              formatMessage({ id: 'validation.range' }, { min: rule.min, max: rule.max });
            callback(new Error(rule.message));
          }
        }
      }
      callback();
    },
  };
};

/**
 * 正则校验
 * @param regex 正则表达式
 */
export const getRegex = (regex: string | RegExp): object => {
  return {
    validator: (rule, value, callback) => {
      if (value === undefined) {
        callback();
        return;
      }
      rule.regex = regex;
      rule.message = rule.message || formatMessage({ id: 'validation.regex' });
      if (typeof rule.regex === 'string') {
        rule.regex = new RegExp(regex);
      }
      if (value && !rule.regex.test(value)) {
        callback(new Error(rule.message));
      }
      callback();
    },
  };
};

/**
 * 远程校验
 * @param {string} url 校验地址 需要返回true 通过 或者false 失败
 * @param {string} message 校验不通过的提示消息
 */
export const getRemoteRule = (
  url: string,
  message: string = formatMessage({ id: 'validation.remote' })
): object => {
  return {
    validator(rule, value, callback) {
      rule.message = rule.message || message;
      if (!value) {
        callback();
        return;
      }
      get({
        url,
        data: {
          filter: value || '',
          key: new Date().getTime(),
        },
      }).then(rep => {
        if (rep) {
          callback();
        } else {
          callback(new Error(rule.message));
        }
      });
    },
  };
};
