import toastReducer, { TOAST_ACTION_TYPES, ToastState } from './toastReducer';
import { generateToastId } from './utils';

describe('Toast reducer', function(): void {
  it('should correctly add a toast', (): void => {
    const initialState: ToastState = {
      items: [{ _id: '123', content: 'test', type: 'info' }],
    };

    const result: ToastState = toastReducer(initialState, {
      type: TOAST_ACTION_TYPES.ADD_TOAST,
      payload: { _id: generateToastId(), content: 'jest test', type: 'info' },
    });

    const expectedResult: ToastState = {
      items: [
        { _id: '123', content: 'test', type: 'info' },
        { _id: expect.any(String), content: 'jest test', type: 'info' },
      ],
    };

    expect(result).toEqual(expectedResult);
  });

  it('should correctly remove a toast', (): void => {
    const initialState: ToastState = {
      items: [
        { _id: '123', content: 'test', type: 'info' },
        { _id: '245', content: 'jest test', type: 'info' },
      ],
    };

    const result: ToastState = toastReducer(initialState, {
      type: TOAST_ACTION_TYPES.REMOVE_TOAST,
      payload: '245',
    });

    const expectedResult: ToastState = {
      items: [{ _id: '123', content: 'test', type: 'info' }],
    };

    expect(result).toEqual(expectedResult);
  });

  it('should correctly update a toast', (): void => {
    const initialState: ToastState = {
      items: [
        { _id: '123', content: 'test', type: 'info' },
        { _id: '245', content: 'jest test', type: 'info' },
      ],
    };

    const result: ToastState = toastReducer(initialState, {
      type: TOAST_ACTION_TYPES.UPDATE_TOAST,
      payload: {
        _id: '245',
        content: 'My other test',
      },
    });

    const expectedResult: ToastState = {
      items: [
        { _id: '123', content: 'test', type: 'info' },
        { _id: '245', content: 'My other test', type: 'info' },
      ],
    };

    expect(result).toEqual(expectedResult);
  });

  it('should add a toast if mine no more exists when trying to update it', (): void => {
    const initialState: ToastState = {
      items: [
        { _id: '123', content: 'test', type: 'info' },
        { _id: '245', content: 'jest test', type: 'info' },
      ],
    };

    const result: ToastState = toastReducer(initialState, {
      type: TOAST_ACTION_TYPES.UPDATE_TOAST,
      payload: {
        _id: '2435',
        content: 'My other test',
      },
    });

    const expectedResult: ToastState = {
      items: [
        { _id: '123', content: 'test', type: 'info' },
        { _id: '245', content: 'jest test', type: 'info' },
        { _id: expect.any(String), content: 'My other test', type: 'info' },
      ],
    };

    expect(result).toEqual(expectedResult);
  });

  it('should create a toast with correct type', (): void => {
    const initialState: ToastState = {
      items: [],
    };

    const result: ToastState = toastReducer(initialState, {
      type: TOAST_ACTION_TYPES.ADD_TOAST,
      payload: {
        _id: generateToastId(),
        content: 'My other test',
        type: 'error',
      },
    });

    const expectedResult: ToastState = {
      items: [
        { _id: expect.any(String), content: 'My other test', type: 'error' },
      ],
    };

    expect(result).toEqual(expectedResult);
  });

  it('should create a toast with default type', (): void => {
    const initialState: ToastState = {
      items: [],
    };

    const result: ToastState = toastReducer(initialState, {
      type: TOAST_ACTION_TYPES.ADD_TOAST,
      payload: {
        _id: generateToastId(),
        content: 'My other test',
      },
    });

    const expectedResult: ToastState = {
      items: [
        { _id: expect.any(String), content: 'My other test', type: 'info' },
      ],
    };

    expect(result).toEqual(expectedResult);
  });

  it('should update a toast without touching type', (): void => {
    const initialState: ToastState = {
      items: [{ _id: '123', content: 'Coucou', type: 'warning' }],
    };

    const result: ToastState = toastReducer(initialState, {
      type: TOAST_ACTION_TYPES.UPDATE_TOAST,
      payload: {
        _id: '123',
        content: 'My other test',
      },
    });

    const expectedResult: ToastState = {
      items: [{ _id: '123', content: 'My other test', type: 'warning' }],
    };

    expect(result).toEqual(expectedResult);
  });

  it('should update a toast and changing type', (): void => {
    const initialState: ToastState = {
      items: [{ _id: '123', content: 'Coucou', type: 'warning' }],
    };

    const result: ToastState = toastReducer(initialState, {
      type: TOAST_ACTION_TYPES.UPDATE_TOAST,
      payload: {
        _id: '123',
        content: 'My other test',
        type: 'error',
      },
    });

    const expectedResult: ToastState = {
      items: [{ _id: '123', content: 'My other test', type: 'error' }],
    };

    expect(result).toEqual(expectedResult);
  });
});
