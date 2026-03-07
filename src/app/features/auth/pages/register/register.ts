import { Component } from '@angular/core';
import { AuthTitle } from '../../../../shared/ui/auth-title/auth-title';
import { RegisterForm } from '../../components/register-form/register-form';
import { AuthLink } from '../../../../shared/ui/auth-link/auth-link';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports:[AuthTitle, RegisterForm, AuthLink, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {}
