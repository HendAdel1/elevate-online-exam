import { Component } from '@angular/core';
import { Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-password-form',
  imports: [LucideAngularModule, AuthButton],
  templateUrl: './create-new-password-form.html',
  styleUrl: './create-new-password-form.css',
  providers:[{
          provide: LUCIDE_ICONS,
          multi: true,
          useValue: new LucideIconProvider({EyeOff, Eye}),
        }]
})
export class CreateNewPasswordForm {

  loginForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  loginError: string | null = null;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      // Mark all controls as touched to show validation errors
      this.loginForm.markAllAsTouched();
      this.loginError = 'Something went wrong';
      return;
    }
  }

  get password() {
    return this.loginForm.get('password');
  }

  get confirmPassword() {
    return this.loginForm.get('confirmPassword');
  }

}
