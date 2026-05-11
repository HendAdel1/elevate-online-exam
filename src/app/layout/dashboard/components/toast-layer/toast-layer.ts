import { Component, inject } from '@angular/core';
import { Check, CircleX, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-toast-layer',
  imports: [LucideAngularModule],
  templateUrl: './toast-layer.html',
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Check, CircleX }),
    },
  ],
})
export class ToastLayer {
  protected readonly toast = inject(ToastService);
}
