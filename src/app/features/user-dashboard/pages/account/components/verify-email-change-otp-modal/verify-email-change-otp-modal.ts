import {
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
  afterNextRender,
  inject,
} from '@angular/core';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, X } from 'lucide-angular';
import { finalize } from 'rxjs';
import type { AccountUser } from '../../models/account-profile.models';
import { AccountProfileService } from '../../services/account-profile.service';

@Component({
  selector: 'app-verify-email-change-otp-modal',
  imports: [LucideAngularModule],
  templateUrl: './verify-email-change-otp-modal.html',
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ X }),
    },
  ],
})
export class VerifyEmailChangeOtpModal implements OnChanges, OnDestroy {
  private readonly accountProfile = inject(AccountProfileService);
  private readonly injector = inject(Injector);

  @Input({ required: true }) open = false;
  @Input() pendingEmail = '';
  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly editRequested = new EventEmitter<void>();
  @Output() readonly emailConfirmed = new EventEmitter<AccountUser>();

  readonly otpSlots = Array.from({ length: 6 });
  otpValues: string[] = Array(6).fill('');

  @ViewChildren('otpBox') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  resendSeconds = 0;
  submitting = false;
  apiMessage = '';

  private resendHandle: ReturnType<typeof setInterval> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) {
      this.resetFormState();
      this.startResendCooldown(60);
    }
    if (changes['open']?.currentValue === false) {
      this.clearResendTimer();
    }
  }

  ngOnDestroy(): void {
    this.clearResendTimer();
  }

  close(): void {
    this.closed.emit();
  }

  requestEdit(): void {
    this.editRequested.emit();
  }

  onOtpInput(event: Event, index: number): void {
    this.apiMessage = '';
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    input.value = value.slice(0, 1);
    this.otpValues[index] = input.value;

    if (value && index < 5) {
      this.focusOtp(index + 1);
    }

    if (this.otpValues.join('').length === 6) {
      this.verifyCode();
    }
  }

  onOtpKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.focusOtp(index - 1);
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const raw = event.clipboardData?.getData('text') ?? '';
    const digits = raw.replace(/\D/g, '').slice(0, 6);
    if (!digits) return;
    for (let i = 0; i < 6; i++) {
      this.otpValues[i] = digits[i] ?? '';
    }
    this.syncDomFromValues();
    const next = Math.min(digits.length, 5);
    this.focusOtp(next);
    if (digits.length === 6) {
      this.verifyCode();
    }
  }

  verifyCode(): void {
    if (this.submitting) return;
    this.apiMessage = '';
    const code = this.otpValues.join('');
    if (!/^\d{6}$/.test(code)) {
      this.apiMessage = 'Enter the 6-digit code.';
      return;
    }

    this.submitting = true;
    this.accountProfile
      .confirmEmailChange({ code })
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: (user) => this.emailConfirmed.emit(user),
        error: () => {
          this.apiMessage = 'Invalid or expired code.';
        },
      });
  }

  resendCode(): void {
    if (this.resendSeconds > 0 || this.submitting) return;
    const email = this.pendingEmail.trim();
    if (!email) return;

    this.apiMessage = '';
    this.submitting = true;
    this.accountProfile
      .requestEmailChange({ newEmail: email })
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: () => this.startResendCooldown(60),
        error: () => {
          this.apiMessage = 'Could not resend the code. Try again.';
        },
      });
  }

  private focusOtp(index: number): void {
    const list = this.otpInputs?.toArray() ?? [];
    list[index]?.nativeElement.focus();
  }

  private syncDomFromValues(): void {
    const list = this.otpInputs?.toArray() ?? [];
    list.forEach((ref, i) => {
      ref.nativeElement.value = this.otpValues[i] ?? '';
    });
  }

  private resetFormState(): void {
    this.apiMessage = '';
    this.submitting = false;
    this.otpValues = Array(6).fill('');
    afterNextRender(
      () => {
        const list = this.otpInputs?.toArray() ?? [];
        list.forEach((ref, i) => {
          ref.nativeElement.value = this.otpValues[i] ?? '';
        });
        this.focusOtp(0);
      },
      { injector: this.injector }
    );
  }

  private startResendCooldown(seconds: number): void {
    this.clearResendTimer();
    this.resendSeconds = seconds;
    this.resendHandle = setInterval(() => {
      this.resendSeconds--;
      if (this.resendSeconds <= 0) {
        this.clearResendTimer();
      }
    }, 1000);
  }

  private clearResendTimer(): void {
    if (this.resendHandle) {
      clearInterval(this.resendHandle);
      this.resendHandle = null;
    }
  }
}
