import { Component } from '@angular/core';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';

@Component({
  selector: 'app-register-form',
  imports: [AuthButton, LucideAngularModule],
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
