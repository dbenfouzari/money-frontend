/* eslint-disable deprecate/member-expression */

import { debug } from './debug';

describe('debug utils', () => {
  it('should have `error` method that calls console.error', () => {
    console.error = jest.fn();
    debug.error('test message');

    expect(console.error).toHaveBeenCalledWith('test message');
  });

  it('should have `log` method that calls console.log', () => {
    console.log = jest.fn();
    debug.log('test message');

    expect(console.log).toHaveBeenCalledWith('test message');
  });

  it('should have `warn` method that calls console.warn', () => {
    console.warn = jest.fn();
    debug.warn('test message');

    expect(console.warn).toHaveBeenCalledWith('test message');
  });
});
