import { Component, DestroyRef, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../../../projects/auth/src/lib/services/auth.service';
import { RegisterRequest } from '../../../../../../projects/auth/src/lib/models/requests/register.request';
import { setBoolean } from '../../utils/storage.util';
import { passwordValidator, passwordMatchValidator } from '../../validators/password.validator';
import { AuthError } from '../../../../shared/ui/auth-error/auth-error';
import {
  CREATE_PASSWORD_ACCESS_STORAGE_KEY,
  USER_INFO_ACCESS_STORAGE_KEY,
  USER_INFO_STORAGE_KEY,
  VERIFY_EMAIL_STORAGE_KEY,
} from '../../constants/registration-session.keys';

@Component({
  selector: 'app-create-password-form',
  imports: [LucideAngularModule, AuthButton, ReactiveFormsModule, AuthError],
  templateUrl: './create-password-form.html',
  styleUrl: './create-password-form.css',
  providers:[{ 
        provide: LUCIDE_ICONS,
        multi: true,
        useValue: new LucideIconProvider({EyeOff, Eye}), 
      }]
})
export class CreatePasswordForm implements OnInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  registerForm: FormGroup;
  controls: any;

  showPassword = false;
  showConfirmPassword = false;

  errorMessage: string | null = null;
  isSubmitting = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.fb.group(
      {
        password: ['', [Validators.required, passwordValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator() }
    );

    this.controls = this.registerForm.controls;
  }

  ngOnInit(): void {
    history.pushState(null, '', location.href);
  }

  @HostListener('window:popstate')
  onBrowserBack(): void {
    setBoolean(USER_INFO_ACCESS_STORAGE_KEY, false);
    setBoolean(CREATE_PASSWORD_ACCESS_STORAGE_KEY, false);

    sessionStorage.removeItem(USER_INFO_STORAGE_KEY);
    sessionStorage.removeItem(VERIFY_EMAIL_STORAGE_KEY);

    this.router.navigate(['/auth/register/email'], {
      queryParams: { focus: 'email' },
      replaceUrl: true,
    });
  }

  ngAfterViewInit() {
    const focus = this.route.snapshot.queryParamMap.get('focus');
    if (focus === 'password') {
      this.passwordInput?.nativeElement.focus();
    }
  }

  // reusable input classes to avoid code duplication
  getInputClasses(control: AbstractControl | null, extraInvalid = false): string {
    const base =
      'w-full border px-4 py-3 pr-10 focus:outline-none placeholder:text-gray-400';

    const isInvalid = (control?.invalid && control?.touched) || extraInvalid;

    return isInvalid
      ? `${base} border-red-500 focus:border-red-500`
      : `${base} border-gray-200 focus:border-blue-600`;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.errorMessage = this.formErrorMessage;

      this.passwordInput?.nativeElement.focus();
      return;
    }

    const userInfoRaw = sessionStorage.getItem(USER_INFO_STORAGE_KEY);
    const email = (sessionStorage.getItem(VERIFY_EMAIL_STORAGE_KEY) ?? '')
      .trim()
      .toLowerCase();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!userInfoRaw || !email || !isValidEmail) {
      this.errorMessage = 'Missing registration data. Please start again.';
      this.router.navigate(['/auth/register/email'], {
        queryParams: { focus: 'email' },
      });
      return;
    }

    let userInfo: Omit<RegisterRequest, 'email' | 'password' | 'confirmPassword'>;

    try {
      userInfo = JSON.parse(userInfoRaw);
    } catch {
      this.errorMessage = 'Invalid saved registration info. Please start again.';
      this.router.navigate(['/auth/register/email'], {
        queryParams: { focus: 'email' },
      });
      return;
    }

    const { password, confirmPassword } = this.registerForm.value;

    const payload: RegisterRequest = {
      ...userInfo,
      email,
      password,
      confirmPassword,
    };

    if (!payload.firstName || !payload.lastName || !payload.username || !payload.phone) {
      this.errorMessage = 'Missing registration data. Please complete your info first.';
      this.router.navigate(['/auth/register/user-info']);
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage = null;

    this.authService
      .register(payload)
      .pipe(finalize(() => this.isSubmitting.set(false)), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.message !== 'Registration successful') {
            this.errorMessage = res.message || 'Registration failed.';
            return;
          }

          sessionStorage.removeItem(USER_INFO_STORAGE_KEY);
          sessionStorage.removeItem(VERIFY_EMAIL_STORAGE_KEY);

          setBoolean(CREATE_PASSWORD_ACCESS_STORAGE_KEY, false);

          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Something went wrong';
        },
      });
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

    if (this.registerForm.hasError('passwordMismatch')) {
      return 'Passwords do not match.';
    }

    return '';
  }

  get formErrorMessage(): string {
    return (
      this.passwordErrorMessage ||
      this.confirmPasswordErrorMessage ||
      'Please check your inputs.'
    );
  }

  ngOnDestroy(): void {
    history.replaceState(null, '', location.href);
  }
}