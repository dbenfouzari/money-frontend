import { generateToastId } from './utils';

describe('Toast utils', () => {
  describe('generateToastId', () => {
    it('should return a toastId', () => {
      const result = generateToastId();

      expect(result.length).toEqual(10);
    });
  });
});
