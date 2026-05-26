import { Component, Input } from '@angular/core';
import { CircleX, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';

@Component({
  selector: 'app-auth-error',
  imports: [LucideAngularModule],
  templateUrl: './auth-error.html',
  styleUrl: './auth-error.css',
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ CircleX }),
  }]
})
export class AuthError {
  @Input() message: string | null = null;
}
