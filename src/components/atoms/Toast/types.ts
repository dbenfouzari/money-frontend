export type ToastType = 'info' | 'error' | 'success' | 'warning';

export interface Toast {
  _id: string;
  content: string;
  type: ToastType;
}
