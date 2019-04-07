import { formatMessage } from 'umi-plugin-react/locale';
import { every, get as depGet } from 'lodash';
import { get } from './request';

/**
 * 必填校验
 * @param {bool} isRequire 是否必填
 */
export const getRequire = (isRequire: boolean = true): object => {
  return {
    required: isRequire,
    message: formatMessage({ id: 'validation.require' }),
  };
};

/**
 * 文字必填
 * @param {boolean} isRequire 是否必填
 */
export const getTextRequire = (isRequire: boolean = true): object => {
  return {
    required: isRequire,
    whitespace: true,
    message: formatMessage({ id: 'validation.require' }),
  };
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
 * 字符串最大长度
 * @param {number} max 最大值
 */
export const getMaxLength = (max: number): object => {
  return {
    max,
    message: formatMessage({ id: 'validation.max' }, { max }),
  };
};

/**
 * 字符串最小长度
 * @param {number} min 最小值
 */
export const getMinLength = (min: number): object => {
  return {
    min,
    message: formatMessage({ id: 'validation.min' }, { min }),
  };
};

/**
 * 字符串长度范围
 * @param min {number} 最小长度
 * @param max {number} 最大长度
 */
export const getRangeLength = (min: number, max: number): object[] => {
  return [getMinLength(min), getMaxLength(max)];
};

/**
 * 数值最大值
 * @param {number} max 最大值
 */
export const getMaxValue = max => {
  return {
    type: 'number',
    max,
    message: formatMessage({ id: 'validation.max-value' }, { max }),
  };
};

/**
 * 数值最小值
 * @param {number} min 数值最小值
 */
export const getMinValue = min => {
  return {
    validator: (_, value, callback) => {
      if (value && value < min) {
        callback(formatMessage({ id: 'validation.min-value' }, { min }));
      }
      callback();
    },
  };
};

/**
 * 数值范围
 * @param min {number} 最小值
 * @param max {number} 最大值
 */
export const getRangeValue = (min: number, max: number): object[] => {
  return [getMinValue(min), getMaxValue(max)];
};

/**
 * 数值总位数
 * @param {number} max 最大的数字位数
 */
export const getMaxValueLength = (max: number): object => {
  return {
    validator: (_, value, callback) => {
      if (value && `${value}`.length > max) {
        callback(formatMessage({ id: 'validation.max-value-length' }, { max }));
      }
      callback();
    },
  };
};

// TODO 需要添加支持其他国家的号码规则
/**
 * 手机号码校验
 * @param rule 号码规则 中国、其他
 */
export const getPhone = (rule: 'china' | 'all' = 'china'): object => {
  let pattern;
  switch (rule) {
    case 'china':
      pattern = /^1\d{10}$/;
      break;
    case 'all':
      pattern = /^[0-9|-]$/;
      break;
    default:
      pattern = /^[0-9|-]$/;
      break;
  }
  return {
    pattern,
    message: 'validation.phone',
  };
};

/**
 * 邮箱规则
 */
export const getEmail = (): object => {
  return {
    pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi,
    message: 'validation.email',
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
) => {
  return {
    validator(_, value, callback) {
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
          callback(message);
        }
      });
    },
  };
};

/**
 * 邮编验证 暂时只限制为数字
 */
export const getPost = (): object => {
  return {
    pattern: /^\d+$/,
    message: formatMessage({ id: 'validation.email' }),
  };
};
