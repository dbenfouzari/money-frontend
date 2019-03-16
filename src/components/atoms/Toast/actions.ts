import {
  AddToastAction,
  RemoveToastAction,
  TOAST_ACTION_TYPES,
  UpdateToastAction,
} from './toastReducer';
import { generateToastId } from './utils';
import { ToastType } from './types';

export const addToast = (
  content: string,
  type: ToastType = 'info',
): AddToastAction => ({
  type: TOAST_ACTION_TYPES.ADD_TOAST,
  payload: {
    _id: generateToastId(),
    content,
    type,
  },
});

export const removeToast = (id: string): RemoveToastAction => ({
  type: TOAST_ACTION_TYPES.REMOVE_TOAST,
  payload: id,
});

export const updateToast = (
  id: string,
  content: string,
  type: ToastType = 'info',
): UpdateToastAction => ({
  type: TOAST_ACTION_TYPES.UPDATE_TOAST,
  payload: {
    _id: id,
    content,
    type,
  },
});
