import { Component } from '@angular/core';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { CircleX, Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [AuthButton, LucideAngularModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  providers:[{
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({EyeOff, Eye, CircleX}),
    }]
})
export class LoginForm {

  loginForm: FormGroup;
  showPassword = false;
  loginError: string | null = null;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      // Mark all controls as touched to show validation errors
      this.loginForm.markAllAsTouched();
      this.loginError = 'Something went wrong';
      return;
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
