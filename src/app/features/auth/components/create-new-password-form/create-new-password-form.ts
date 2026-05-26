import { passwordValidator, passwordMatchValidator } from './../../validators/password.validator';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthInput } from "../../../../shared/ui/auth-input/auth-input";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../../projects/auth/src/lib/services/auth.service';
import { ResetPasswordRequest } from '../../../../../../projects/auth/src/lib/models/requests/reset-password.request';
import { finalize } from 'rxjs';
import { AuthError } from '../../../../shared/ui/auth-error/auth-error';
@Component({
  selector: 'app-create-new-password-form',
  imports: [LucideAngularModule, AuthButton, AuthInput, ReactiveFormsModule, AuthError],
  templateUrl: './create-new-password-form.html',
  styleUrl: './create-new-password-form.css',
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ EyeOff, Eye }),
  }]
})
export class CreateNewPasswordForm implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  form: FormGroup;
  errorMessage: string | null = null;
  showPassword = false;
  showConfirmPassword = false;
  token: string = '';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, passwordValidator()]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator() },
    );
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.token = params.get('token') ?? '';
      });
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


  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.token) {
      this.errorMessage = 'Reset token is missing or invalid.';
      return;
    }

    const { password, confirmPassword } = this.form.value;

    const payload: ResetPasswordRequest = {
      token: this.token,
      newPassword: password,
      confirmPassword,
    };

    this.isSubmitting = true;
    this.errorMessage = null;

    this.authService
      .resetPassword(payload)
      .pipe(finalize(() => (this.isSubmitting = false)), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          sessionStorage.removeItem('auth_forgot_password_email');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.errorMessage = err?.message || 'Something went wrong';
        }
      });
  }
}
