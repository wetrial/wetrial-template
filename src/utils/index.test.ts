import { fixedZero, getQuery } from './index';

describe('util base', () => {
  // 测试 isDefined 方法
  describe('isDefined function', () => {
    it('已定义', () => {
      expect(fixedZero(10)).toBe('0000000000');
    });
  });

  // 测试 isPromise 方法
  describe('isPromise function', () => {
    it('number is not promise', () => {
      expect(getQuery('')).toBe({});
    });
  });
});
