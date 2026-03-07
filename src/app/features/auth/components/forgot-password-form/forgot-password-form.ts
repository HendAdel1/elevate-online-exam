import { Component, Output } from '@angular/core';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';

@Component({
  selector: 'app-forgot-password-form',
  imports: [AuthButton],
  templateUrl: './forgot-password-form.html',
  styleUrl: './forgot-password-form.css',
})
export class ForgotPasswordForm {
}
