import { Component } from '@angular/core';
import { Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';

@Component({
  selector: 'app-create-password-form',
  imports: [LucideAngularModule, AuthButton],
  templateUrl: './create-password-form.html',
  styleUrl: './create-password-form.css',
  providers:[{
        provide: LUCIDE_ICONS,
        multi: true,
        useValue: new LucideIconProvider({EyeOff, Eye}),
      }]
})
export class CreatePasswordForm {

}
