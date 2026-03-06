import { Component } from '@angular/core';
import { AuthTitle } from '../../../../shared/ui/auth-title/auth-title';
import { RegisterForm } from '../../components/register-form/register-form';

@Component({
  selector: 'app-register',
  imports:[AuthTitle, RegisterForm],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {}
