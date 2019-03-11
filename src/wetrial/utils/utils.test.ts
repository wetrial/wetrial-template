import { includes,isUrl } from './utils';

describe('test isUrl method',()=>{
  it('https url', () => {
    expect(isUrl('httPs://www.baidu.com')).toEqual(true);
  });

  // it('http url', () => {
  //   expect(isUrl('http://www.baidu.com')).toEqual(true);
  // });

  // it('abcd', () => {
  //   expect(isUrl('www.baidu.com')).toEqual(true)
  // });
  
  it('local url', () => {
    expect(isUrl('/test/')).toEqual(false);
  });
  
})

describe('test includes method', () => {
  it('string match single', () => {
    expect(includes(['aa', 'bb', 'cc'], 'aa')).toEqual(true);
  });

  it('string match array', () => {
    expect(includes(['aa', 'bb', 'cc'], ['aa', 'cc'])).toEqual(true);
  });

  it('string match array one exists', () => {
    expect(includes(['aa', 'bb', 'cc'], ['bbb', 'cc'])).toEqual(true);
  });

  it('string match array every not exists', () => {
    expect(includes(['aa', 'bb', 'cc'], ['bbb', 'ccc'])).toEqual(false);
  });

  it('number match single', () => {
    expect(includes([1, 2, 3], 1)).toEqual(true);
  });

  it('number match array', () => {
    expect(includes([1, 2, 3], [1, 22])).toEqual(true);
  });

  it('number match array not exists', () => {
    expect(includes([1, 2, 3], [11, 22])).toEqual(false);
  });
});
