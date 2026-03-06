import { Component } from '@angular/core';
import { AuthTitle } from '../../../../shared/ui/auth-title/auth-title';
import { ForgotPasswordForm } from '../../components/forgot-password-form/forgot-password-form';

@Component({
  selector: 'app-forgot-password',
  imports: [AuthTitle, ForgotPasswordForm],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {}
