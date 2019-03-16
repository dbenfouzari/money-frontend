import { AnyAction } from 'redux';

import { Toast, ToastType } from './types';
import { addToast } from './actions';

export interface ToastPayload {
  content: string;
  _id: string;
  type: ToastType;
}

export const TOAST_ACTION_TYPES = {
  ADD_TOAST: '@@toasts/ADD_TOAST',
  REMOVE_TOAST: '@@toasts/REMOVE_TOAST',
  UPDATE_TOAST: '@@toasts/UPDATE_TOAST',
};

export interface ToastState {
  items: Toast[];
}

export interface AddToastAction {
  type: typeof TOAST_ACTION_TYPES.ADD_TOAST;
  payload: ToastPayload;
}

export interface RemoveToastAction {
  type: typeof TOAST_ACTION_TYPES.REMOVE_TOAST;
  payload: Toast['_id'];
}

export interface UpdateToastAction {
  type: typeof TOAST_ACTION_TYPES.UPDATE_TOAST;
  payload: ToastPayload;
}

export type ToastAction =
  | AddToastAction
  | RemoveToastAction
  | UpdateToastAction
  | AnyAction;

const initialState: ToastState = {
  items: [],
};

const toastReducer = (
  state: ToastState = initialState,
  action: ToastAction,
): ToastState => {
  switch (action.type) {
    case TOAST_ACTION_TYPES.ADD_TOAST:
      return {
        ...state,
        items: [
          ...state.items,
          { type: 'info', ...(action as AddToastAction).payload },
        ],
      };

    case TOAST_ACTION_TYPES.REMOVE_TOAST:
      return {
        ...state,
        items: [...state.items].filter(
          item => item._id !== (action as RemoveToastAction).payload,
        ),
      };

    case TOAST_ACTION_TYPES.UPDATE_TOAST:
      const toastIndex = state.items.findIndex(
        item => item._id === (action as UpdateToastAction).payload._id,
      );

      if (toastIndex > -1) {
        const nextItems = [...state.items];
        nextItems[toastIndex] = { ...nextItems[toastIndex], ...action.payload };

        return {
          ...state,
          items: nextItems,
        };
      }

      return toastReducer(
        state,
        addToast((action as AddToastAction).payload.content),
      );

    default:
      return state;
  }
};

export default toastReducer;
