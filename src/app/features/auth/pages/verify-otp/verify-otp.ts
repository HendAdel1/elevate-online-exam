import { Component } from '@angular/core';
import { AuthBackButton } from '../../../../shared/ui/auth-back-button/auth-back-button';
import { VerifyOtpForm } from '../../components/verify-otp-form/verify-otp-form';
import { AuthLink } from '../../../../shared/ui/auth-link/auth-link';
import { AuthTitle } from '../../../../shared/ui/auth-title/auth-title';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  imports: [AuthBackButton,AuthTitle, VerifyOtpForm, AuthLink, RouterLink],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css',
})
export class VerifyOtp {}
