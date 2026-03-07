import { Component } from '@angular/core';
import { AuthTitle } from '../../../../shared/ui/auth-title/auth-title';
import { ForgotPasswordForm } from '../../components/forgot-password-form/forgot-password-form';
import { AuthLink } from '../../../../shared/ui/auth-link/auth-link';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [AuthTitle, ForgotPasswordForm, AuthLink, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {}
