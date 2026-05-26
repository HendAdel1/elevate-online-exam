export type ToastKind = 'success' | 'error';

export interface ToastItem {
  id: number;
  kind: ToastKind;
  message: string;
}
