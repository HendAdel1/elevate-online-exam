import { Component } from '@angular/core';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [AuthButton, LucideAngularModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  providers:[{
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({EyeOff,Eye}),
    }]
})
export class LoginForm {

}
