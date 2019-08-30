import { fixedZero } from './index';

describe('util base', () => {
  // 测试 isDefined 方法
  describe('isDefined function', () => {
    it('已定义', () => {
      expect(fixedZero(10)).toBe('10');
    });
  });
});
