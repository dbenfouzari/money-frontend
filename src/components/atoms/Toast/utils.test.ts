import { generateToastId } from './utils';

describe('Toast utils', (): void => {
  describe('generateToastId', (): void => {
    it('should return a toastId', (): void => {
      const result = generateToastId();

      expect(result.length).toEqual(10);
    });
  });
});
