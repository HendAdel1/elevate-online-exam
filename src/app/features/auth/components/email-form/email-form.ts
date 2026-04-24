import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthButton } from "../../../../shared/ui/auth-button/auth-button";
import { AuthService } from '../../../../../../projects/auth/src/lib/services/auth.service';
import { setBoolean } from '../../utils/storage.util';

const VERIFY_EMAIL_STORAGE_KEY = 'auth_verify_email';
const USER_INFO_ACCESS_STORAGE_KEY = 'auth_user_info_access';

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [ReactiveFormsModule, AuthButton],
  templateUrl: './email-form.html',
  styleUrl: './email-form.css',
})
export class EmailForm implements OnInit, AfterViewInit {

  @ViewChild('emailInput') emailInput!: ElementRef;

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)],
    }),
  });

  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    setBoolean(USER_INFO_ACCESS_STORAGE_KEY, false);
  }

  ngAfterViewInit(): void {
    const focus = this.route.snapshot.queryParamMap.get('focus');
    if (focus === 'email') {
      this.emailInput.nativeElement.focus();
    }
  }

  get emailControl() {
    return this.form.controls.email;
  }

  get emailErrorMessage(): string {
    const control = this.emailControl;
  
    if (!control.touched) return '';
  
    if (control.hasError('required')) return 'Email is required.';
    if (control.hasError('email') || control.hasError('pattern')) return 'Please enter a valid email address.';
    if (control.hasError('maxlength')) return 'Email is too long.';
  
    return '';
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const email = this.form.controls.email.value.trim().toLowerCase();
    setBoolean(USER_INFO_ACCESS_STORAGE_KEY, false);

    this.authService.sendEmail({ email }).pipe(
      finalize(() => this.isSubmitting.set(false))
    ).subscribe({
      next: () => {
        sessionStorage.setItem(VERIFY_EMAIL_STORAGE_KEY, email);
        this.successMessage.set('Verification code sent successfully.');
        this.router.navigate(['/auth/register/verify-otp']);
      },
      error: (err: { error?: { message?: string }; message?: string }) => {
        this.errorMessage.set(err?.error?.message ?? err?.message ?? 'Failed to send verification code.');
      },
    });
  }
}
