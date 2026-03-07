import { Component } from '@angular/core';
import { AuthTitle } from '../../../../shared/ui/auth-title/auth-title';
import { AuthLink } from '../../../../shared/ui/auth-link/auth-link';
import { RouterLink } from '@angular/router';
import { VerifyEmailSection } from '../../components/verify-email-section/verify-email-section';
import { AuthBackButton } from '../../../../shared/ui/auth-back-button/auth-back-button';

@Component({
  selector: 'app-verify-email',
  imports: [AuthTitle, AuthLink, RouterLink, VerifyEmailSection, AuthBackButton],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail {}
