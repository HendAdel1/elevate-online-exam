import { Injectable, signal } from '@angular/core';

import type { ToastItem, ToastKind } from './toast.models';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;

  readonly toasts = signal<readonly ToastItem[]>([]);

  success(message: string): void {
    this.push('success', message);
  }

  error(message: string): void {
    this.push('error', message);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private push(kind: ToastKind, message: string): void {
    const id = ++this.nextId;
    this.toasts.update((list) => [...list, { id, kind, message }]);
    window.setTimeout(() => this.dismiss(id), 4500);
  }
}
