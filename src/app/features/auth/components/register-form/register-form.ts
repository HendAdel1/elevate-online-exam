import { Component } from '@angular/core';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { AuthLink } from '../../../../shared/ui/auth-link/auth-link';
import { Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [AuthButton, AuthLink, LucideAngularModule, RouterLink],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ EyeOff, Eye }),
  }]
})
export class RegisterForm {

}
