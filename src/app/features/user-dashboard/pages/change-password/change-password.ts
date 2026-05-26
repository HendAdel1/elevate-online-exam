import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  CircleX,
  Eye,
  EyeOff,
  LucideAngularModule,
  LucideIconProvider,
  LUCIDE_ICONS,
} from 'lucide-angular';
import { finalize } from 'rxjs';
import { ToastService } from '../../../../core/services/toast.service';
import { AccountProfileService } from '../account/services/account-profile.service';
import { passwordMatchValidator } from '../../../auth/validators/password.validator';
import { AuthError } from '../../../../shared/ui/auth-error/auth-error';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, LucideAngularModule, AuthError],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
  host: {
    class: 'flex min-h-0 flex-1 flex-col overflow-hidden',
  },
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        CircleX,
        Eye,
        EyeOff,
      }),
    },
  ],
})
export class ChangePassword implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly accountProfile = inject(AccountProfileService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toast = inject(ToastService);

  readonly submitting = signal(false);

  readonly showCurrent = signal(false);
  readonly showNew = signal(false);
  readonly showConfirm = signal(false);

  readonly apiMessage = signal('');

  readonly form = this.fb.nonNullable.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: [passwordMatchValidator('newPassword', 'confirmPassword', 'mismatch')] }
  );

  ngOnInit(): void {
    this.form.controls.newPassword.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.form.controls.confirmPassword.updateValueAndValidity({ emitEvent: false });
        this.form.updateValueAndValidity({ emitEvent: false });
      });
  }

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    this.apiMessage.set('');
    this.submitting.set(true);

    const { currentPassword, newPassword, confirmPassword } = this.form.getRawValue();

    this.accountProfile
      .changePassword({ currentPassword, newPassword, confirmPassword })
      .pipe(finalize(() => this.submitting.set(false)), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.form.reset();
          const msg =
            typeof res.message === 'string' && res.message.trim()
              ? res.message.trim()
              : 'Your password has been updated.';
          this.toast.success(msg);
        },
        error: (err: unknown) => {
          this.apiMessage.set(this.parseHttpError(err, 'Something went wrong'));
        },
      });
  }

  toggleCurrent(): void {
    this.showCurrent.update((v) => !v);
  }

  toggleNew(): void {
    this.showNew.update((v) => !v);
  }

  toggleConfirm(): void {
    this.showConfirm.update((v) => !v);
  }

  get passwordMismatch(): boolean {
    return (
      this.form.hasError('mismatch') &&
      (this.form.controls.confirmPassword.touched || this.form.controls.confirmPassword.dirty)
    );
  }

  private parseHttpError(err: unknown, fallback: string): string {
    if (err instanceof HttpErrorResponse) {
      const body = err.error;
      if (body && typeof body === 'object' && 'message' in body) {
        const m = (body as { message: unknown }).message;
        if (typeof m === 'string' && m.trim()) return m.trim();
      }
      if (typeof body === 'string' && body.trim()) return body.trim();
    }
    return fallback;
  }
}
