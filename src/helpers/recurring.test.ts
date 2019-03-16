import {
  getIceCubeHashFromRecurrence,
  getIntervalFromInput,
  getRuleAndValidationObjectFromInput,
  IceCubeHash,
  Recurrence,
  IceCubeHashOrNull,
  // getIceCubeRuleToForm,
} from './recurring';

describe('Recurring helpers', () => {
  describe('`getRuleAndValidationObjectFromInput`', () => {
    it('should return correct initial data when passing `week`', () => {
      const result = getRuleAndValidationObjectFromInput('weekly');

      const expectedResult: {
        rule: Recurrence['rule'];
        validations: Recurrence['validations'];
      } = { rule: 'weekly', validations: [] };

      expect(result).toEqual(expectedResult);
    });

    it('should return correct initial data when passing `monthly (by day of week)`', () => {
      const result = getRuleAndValidationObjectFromInput(
        'monthly (by day of week)',
      );

      const expectedResult: {
        rule: Recurrence['rule'];
        validations: Recurrence['validations'];
      } = { rule: 'monthly', validations: { 1: [], 2: [], 3: [], 4: [] } };

      expect(result).toEqual(expectedResult);
    });

    it('should return correct initial data when passing `monthly (by day of month)`', () => {
      const result = getRuleAndValidationObjectFromInput(
        'monthly (by day of month)',
      );

      const expectedResult: {
        rule: Recurrence['rule'];
        validations: Recurrence['validations'];
      } = { rule: 'monthly', validations: [] };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('`getIntervalFromInput`', () => {
    it('should return correct value when giving an empty string', () => {
      const result = getIntervalFromInput('');
      const expectedResult = 0;

      expect(result).toEqual(expectedResult);
    });

    it('should return correct value when giving a string', () => {
      const result = getIntervalFromInput('32');
      const expectedResult = 32;

      expect(result).toEqual(expectedResult);
    });

    it('should return correct value when giving a number', () => {
      const result = getIntervalFromInput(15);
      const expectedResult = 15;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('`getIceCubeHashFromRecurrence`', () => {
    it('should return correct data on no given rule', () => {
      const result: IceCubeHashOrNull = getIceCubeHashFromRecurrence({
        rule: '',
        validations: null,
        interval: 1,
        until: '2019-08-25',
        startTime: '10:00 AM',
      });

      const expectedResult: IceCubeHashOrNull = null;

      expect(result).toEqual(expectedResult);
    });

    it('should return correct data on monthly', () => {
      const result: IceCubeHashOrNull = getIceCubeHashFromRecurrence({
        rule: 'monthly',
        validations: [10],
        interval: 1,
        until: '2019-08-25',
        startTime: '10:00 AM',
      });

      const expectedResult: IceCubeHashOrNull = {
        rule_type: 'IceCube::MonthlyRule',
        validations: {
          day_of_month: [10],
          hour_of_day: 10,
          minute_of_hour: 0,
        },
        interval: 1,
        until: '2019-08-25',
      };

      expect(result).toEqual(expectedResult);
    });

    it('should return correct data on nominal case', () => {
      const result: IceCubeHashOrNull = getIceCubeHashFromRecurrence({
        // say we want first day of month
        rule: 'monthly',
        validations: [1],
        interval: 1,
        until: '2019-08-25',
        startTime: '10:00 AM',
      });

      /* eslint-disable @typescript-eslint/camelcase */
      const expectedResult: IceCubeHash = {
        rule_type: 'IceCube::MonthlyRule',
        interval: 1,
        validations: {
          day_of_month: [1],
          hour_of_day: 10,
          minute_of_hour: 0,
        },
        until: '2019-08-25',
      };
      /* eslint-enable @typescript-eslint/camelcase */

      expect(result).toEqual(expectedResult);
    });

    it('should return correct data on nominal case', () => {
      const result: IceCubeHashOrNull = getIceCubeHashFromRecurrence({
        // say we want first day of month
        rule: 'weekly',
        validations: [],
        interval: 1,
        until: '2019-08-25',
        startTime: '10:00 AM',
      });

      /* eslint-disable @typescript-eslint/camelcase */
      const expectedResult: IceCubeHash = {
        rule_type: 'IceCube::WeeklyRule',
        interval: 1,
        validations: {
          day: [],
          hour_of_day: 10,
          minute_of_hour: 0,
        },
        until: '2019-08-25',
      };
      /* eslint-enable @typescript-eslint/camelcase */

      expect(result).toEqual(expectedResult);
    });

    it('should return correct data with real big case', () => {
      const result: IceCubeHashOrNull = getIceCubeHashFromRecurrence({
        // say we want first day of month
        rule: 'monthly',
        validations: { 1: [2], 2: [1], 3: [3, 2], 4: [2] },
        interval: 3,
        until: '2020-05-29',
        startTime: '02:30 PM',
      });

      /* eslint-disable @typescript-eslint/camelcase */
      const expectedResult: IceCubeHash = {
        rule_type: 'IceCube::MonthlyRule',
        interval: 3,
        validations: {
          day_of_week: { 1: [2], 2: [1], 3: [3, 2], 4: [2] },
          hour_of_day: 14,
          minute_of_hour: 30,
        },
        until: '2020-05-29',
      };
      /* eslint-enable @typescript-eslint/camelcase */

      expect(result).toEqual(expectedResult);
    });
  });

  // describe('`getIceCubeRuleToForm`', () => {
  //   it('should return correct data on no given rule', () => {
  //     const result: Recurrence = getIceCubeRuleToForm(null);
  //
  //     const expectedResult: Recurrence = {
  //       rule: '',
  //       validations: null,
  //       interval: 1,
  //       until: expect.any(String),
  //       startTime: expect.any(String),
  //     };
  //
  //     expect(result).toEqual(expectedResult);
  //   });
  //
  //   it('should return correct data on monthly', () => {
  //     const result: Recurrence = getIceCubeRuleToForm({
  //       rule_type: 'IceCube::MonthlyRule',
  //       validations: {
  //         day_of_month: [10],
  //         hour_of_day: 10,
  //         minute_of_hour: 0,
  //       },
  //       interval: 1,
  //       until: '2019-08-25',
  //     });
  //
  //     const expectedResult: Recurrence = {
  //       rule: 'monthly',
  //       validations: [10],
  //       interval: 1,
  //       until: '2019-08-25',
  //       startTime: '10:00 AM',
  //     };
  //
  //     expect(result).toEqual(expectedResult);
  //   });
  //
  //   xit('should return correct data on nominal case', () => {
  //     const result: IceCubeHashOrNull = getIceCubeHashFromRecurrence({
  //       // say we want first day of month
  //       rule: 'monthly',
  //       validations: [1],
  //       interval: 1,
  //       until: '2019-08-25',
  //       startTime: '10:00 AM',
  //     });
  //
  //     /* eslint-disable @typescript-eslint/camelcase */
  //     const expectedResult: IceCubeHash = {
  //       rule_type: 'IceCube::MonthlyRule',
  //       interval: 1,
  //       validations: {
  //         day_of_month: [1],
  //         hour_of_day: 10,
  //         minute_of_hour: 0,
  //       },
  //       until: '2019-08-25',
  //     };
  //     /* eslint-enable @typescript-eslint/camelcase */
  //
  //     expect(result).toEqual(expectedResult);
  //   });
  //
  //   xit('should return correct data on nominal case', () => {
  //     const result: IceCubeHashOrNull = getIceCubeHashFromRecurrence({
  //       // say we want first day of month
  //       rule: 'weekly',
  //       validations: [],
  //       interval: 1,
  //       until: '2019-08-25',
  //       startTime: '10:00 AM',
  //     });
  //
  //     /* eslint-disable @typescript-eslint/camelcase */
  //     const expectedResult: IceCubeHash = {
  //       rule_type: 'IceCube::WeeklyRule',
  //       interval: 1,
  //       validations: {
  //         day: [],
  //         hour_of_day: 10,
  //         minute_of_hour: 0,
  //       },
  //       until: '2019-08-25',
  //     };
  //     /* eslint-enable @typescript-eslint/camelcase */
  //
  //     expect(result).toEqual(expectedResult);
  //   });
  //
  //   xit('should return correct data with real big case', () => {
  //     const result: IceCubeHashOrNull = getIceCubeHashFromRecurrence({
  //       // say we want first day of month
  //       rule: 'monthly',
  //       validations: { 1: [2], 2: [1], 3: [3, 2], 4: [2] },
  //       interval: 3,
  //       until: '2020-05-29',
  //       startTime: '02:30 PM',
  //     });
  //
  //     /* eslint-disable @typescript-eslint/camelcase */
  //     const expectedResult: IceCubeHash = {
  //       rule_type: 'IceCube::MonthlyRule',
  //       interval: 3,
  //       validations: {
  //         day_of_week: { 1: [2], 2: [1], 3: [3, 2], 4: [2] },
  //         hour_of_day: 14,
  //         minute_of_hour: 30,
  //       },
  //       until: '2020-05-29',
  //     };
  //     /* eslint-enable @typescript-eslint/camelcase */
  //
  //     expect(result).toEqual(expectedResult);
  //   });
  // });
});
