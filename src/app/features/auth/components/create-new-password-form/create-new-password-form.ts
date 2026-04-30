import { passwordValidator } from './../../validators/password.validator';
import { Component } from '@angular/core';
import { Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthInput } from "../../../../shared/ui/auth-input/auth-input";


const passwordMatchValidator = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password');
  const confirmPassword = group.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  const mismatch = password.value !== confirmPassword.value;

  if (mismatch) {
    confirmPassword.setErrors({
      ...(confirmPassword.errors || {}),
      passwordMismatch: true,
    });
  } else {
    if (confirmPassword.errors) {
      delete confirmPassword.errors['passwordMismatch'];

      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
  }

  return null;
};
@Component({
  selector: 'app-create-new-password-form',
  imports: [LucideAngularModule, AuthButton, AuthInput, ReactiveFormsModule],
  templateUrl: './create-new-password-form.html',
  styleUrl: './create-new-password-form.css',
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ EyeOff, Eye }),
  }]
})
export class CreateNewPasswordForm {

  form: FormGroup;
  errorMessage: string | null = null;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator }
  );  
}


get controls() {
return this.form.controls;
}
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  // reusable error handler
  private getError(control: AbstractControl | null, map: Record<string, string>): string {
    if (!control?.touched) return '';

    for (const key of Object.keys(map)) {
      if (control.hasError(key)) return map[key];
    }

    return '';
  }

  get passwordErrorMessage(): string {
    return this.getError(this.controls['password'], {
      required: 'Password is required.',
      minlength: 'Password must be at least 8 characters.',
      uppercase: 'Must include at least one uppercase letter.',
      number: 'Must include at least one number.',
      specialChar: 'Must include at least one special character.',
    });
  }

  get confirmPasswordErrorMessage(): string {
    const control = this.controls['confirmPassword'];

    const requiredError = this.getError(control, {
      required: 'Confirm password is required.',
    });

    if (requiredError) return requiredError;

    if (this.form.hasError('passwordMismatch')) {
      return 'Passwords do not match.';
    }

    return '';
  }


}
