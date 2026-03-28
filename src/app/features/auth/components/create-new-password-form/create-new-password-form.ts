import { Component } from '@angular/core';
import { Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';

@Component({
  selector: 'app-create-new-password-form',
  imports: [LucideAngularModule, AuthButton],
  templateUrl: './create-new-password-form.html',
  styleUrl: './create-new-password-form.css',
  providers:[{
          provide: LUCIDE_ICONS,
          multi: true,
          useValue: new LucideIconProvider({EyeOff, Eye}),
        }]
})
export class CreateNewPasswordForm {

}
