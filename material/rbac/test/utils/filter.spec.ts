import { filterFieldFalsy } from '../../src/utils/filter';

describe('filterFieldFalsy function test', function () {
  it('should filter empty string and null and undefined when a object contain many falsy field', function () {
    const target = {
      num: 0,
      str: '',
      nil: null,
      valid: undefined,
      user: 'cc-heart',
      email: 'xxx@cc.com',
    };
    expect(filterFieldFalsy(target)).toEqual({
      num: 0,
      user: 'cc-heart',
      email: 'xxx@cc.com',
    });
  });
});
