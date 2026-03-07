import { Component } from '@angular/core';
import { AuthTitle } from '../../../../shared/ui/auth-title/auth-title';
import { CreatePasswordForm } from '../../components/create-password-form/create-password-form';
import { AuthLink } from '../../../../shared/ui/auth-link/auth-link';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-password',
  imports: [AuthTitle, CreatePasswordForm, AuthLink, RouterLink],
  templateUrl: './create-password.html',
  styleUrl: './create-password.css',
})
export class CreatePassword {}
