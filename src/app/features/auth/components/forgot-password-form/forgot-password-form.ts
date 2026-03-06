import { Component } from '@angular/core';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { AuthLink } from '../../../../shared/ui/auth-link/auth-link';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password-form',
  imports: [AuthButton, AuthLink, RouterLink],
  templateUrl: './forgot-password-form.html',
  styleUrl: './forgot-password-form.css',
})
export class ForgotPasswordForm {

}
