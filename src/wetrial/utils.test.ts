import { isPromise } from './utils';

describe('util base', () => {
  // 测试 isPromise 方法
  describe('isPromise function', () => {
    it('number is not promise', () => {
      expect(isPromise(1)).toBe(false);
    });

    it('string is not promise', () => {
      expect(isPromise('1')).toBe(false);
    });

    it('boolean is not promise', () => {
      expect(isPromise(true)).toBe(false);
    });

    it('new Promise() is promise', () => {
      expect(isPromise(new Promise((resolve)=>resolve(1)))).toEqual(true);
    });
  });
});
