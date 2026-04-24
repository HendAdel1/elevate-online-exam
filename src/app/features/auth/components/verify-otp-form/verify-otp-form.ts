import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, signal } from '@angular/core';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../../../projects/auth/src/lib/services/auth.service';
import { setBoolean } from '../../utils/storage.util';

const VERIFY_EMAIL_STORAGE_KEY = 'auth_verify_email';
const USER_INFO_ACCESS_STORAGE_KEY = 'auth_user_info_access';

@Component({
  selector: 'app-verify-otp-form',
  imports: [AuthButton, RouterModule],
  templateUrl: './verify-otp-form.html',
  styleUrl: './verify-otp-form.css',
})
export class VerifyOtpForm implements OnInit, OnDestroy {

  // Timer
  remainingSeconds = 60;
  private intervalId!: ReturnType<typeof setInterval>;
  private readonly STORAGE_KEY = 'otp_expiry';

  // OTP
  otpArray = Array(6);
  otpValues: string[] = Array(6).fill('');
  @ViewChildren('otp') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  email = '';
  isSubmitting = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem(VERIFY_EMAIL_STORAGE_KEY) ?? '';

    if (!this.email) {
      this.router.navigate(['/auth/register/email'], {
        queryParams: { focus: 'email' },
      });
      return;
    }

    sessionStorage.setItem(VERIFY_EMAIL_STORAGE_KEY, this.email);

    const expiry = Number(sessionStorage.getItem(this.STORAGE_KEY)) || Date.now() + 60_000;

    sessionStorage.setItem(this.STORAGE_KEY, expiry.toString());

    this.startTimer(expiry);
  }

  // Timer 
  private startTimer(expiry: number) {
    const update = () => {
      const remainingMs = expiry - Date.now();
      this.remainingSeconds = Math.max(
        0,
        Math.ceil(remainingMs / 1000)
      );

      if (this.remainingSeconds === 0) {
        clearInterval(this.intervalId);
        sessionStorage.removeItem(this.STORAGE_KEY);
      }
    };

    update();
    this.intervalId = setInterval(update, 1000);
  }

  private resetTimer() {
    clearInterval(this.intervalId);

    const expiry = Date.now() + 60_000;
    sessionStorage.setItem(this.STORAGE_KEY, expiry.toString());

    this.startTimer(expiry);
  }

  // OTP
  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');

    input.value = value;
    this.otpValues[index] = value;

    if (value && index < this.otpArray.length - 1) {
      this.focusInput(index + 1);
    }

    // after auto submit completed
    if (this.otpValues.join('').length === 6) {
      this.verifyCode();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.focusInput(index - 1);
    }
  }

  private focusInput(index: number) {
    const inputs = this.otpInputs.toArray();
    inputs[index]?.nativeElement.focus();
  }

  // Verify 
  verifyCode() {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (!this.email) {
      this.errorMessage.set('Email is missing.');
      return;
    }

    const code = this.otpValues.join('');

    if (!/^\d{6}$/.test(code)) {
      this.errorMessage.set('Enter 6-digit code.');
      return;
    }

    this.isSubmitting.set(true);

    this.authService.verifyEmail({ email: this.email, code })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (res) => {
          sessionStorage.removeItem(VERIFY_EMAIL_STORAGE_KEY);

          if (res.message.toLowerCase().includes('fail')) {
            this.errorMessage.set(res.message);
            return;
          }

          this.successMessage.set(res.message || 'Verified');
          setBoolean(USER_INFO_ACCESS_STORAGE_KEY, true);
          this.router.navigate(['/auth/register/user-info']);
        }
      });
  }

  // Resend Code
  resendCode() {
    if (this.remainingSeconds > 0 || !this.email || this.isSubmitting()) return;

    this.errorMessage.set('');
    this.successMessage.set('');
    this.isSubmitting.set(true);

    this.authService.sendEmail({ email: this.email })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (res) => {
          this.successMessage.set(res.message || 'Code resent');
          this.resetTimer();
        }
      });
  }

  // Destroy
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}