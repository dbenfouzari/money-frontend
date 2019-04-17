import { addToast, removeToast, updateToast } from './actions';

describe('Toast actions', (): void => {
  it('addToast should return correct object', (): void => {
    expect(addToast('hello world', 'warning')).toEqual({
      type: '@@toasts/ADD_TOAST',
      payload: {
        _id: expect.any(String),
        content: 'hello world',
        type: 'warning',
      },
    });
  });

  it('removeToast should return correct object', (): void => {
    expect(removeToast('abc')).toEqual({
      type: '@@toasts/REMOVE_TOAST',
      payload: 'abc',
    });
  });

  it('updateToast should return correct object', (): void => {
    expect(updateToast('abc', 'hello world !', 'error')).toEqual({
      type: '@@toasts/UPDATE_TOAST',
      payload: {
        _id: 'abc',
        content: 'hello world !',
        type: 'error',
      },
    });
  });

  it('updateToast should set type to info as default', (): void => {
    expect(updateToast('abc', 'hello world !')).toEqual({
      type: '@@toasts/UPDATE_TOAST',
      payload: {
        _id: 'abc',
        content: 'hello world !',
        type: 'info',
      },
    });
  });
});
