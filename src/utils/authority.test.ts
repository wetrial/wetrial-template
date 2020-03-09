import { getPermissions } from './authority';

describe('getPermissions should be strong', () => {
  it('string', () => {
    expect(getPermissions('admin')).toEqual(['admin']);
  });
  it('array with double quotes', () => {
    expect(getPermissions('"admin"')).toEqual(['admin']);
  });
  it('array with single item', () => {
    expect(getPermissions('["admin"]')).toEqual(['admin']);
  });
  it('array with multiple items', () => {
    expect(getPermissions('["admin", "guest"]')).toEqual(['admin', 'guest']);
  });
});
