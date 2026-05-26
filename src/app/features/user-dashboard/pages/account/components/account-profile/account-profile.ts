import {
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { Iti } from 'intl-tel-input';
import intlTelInput from 'intl-tel-input';
import { LucideAngularModule, LucideIconProvider, LUCIDE_ICONS, PencilLine } from 'lucide-angular';
import { NgxPhoneField } from 'ngx-phone-field';
import { AuthState } from '../../../../../../core/auth/auth-state';
import { authSession } from '../../../../../../core/auth/auth-session';
import type { User as AuthUser } from '../../../../../../../../projects/auth/src/lib/models/responses/user.response';
import { AuthInput } from '../../../../../../shared/ui/auth-input/auth-input';
import { finalize, merge } from 'rxjs';
import { ToastService } from '../../../../../../core/services/toast.service';
import { DeleteAccountModal } from '../delete-account-modal/delete-account-modal';
import { RequestEmailChangeModal } from '../request-email-change-modal/request-email-change-modal';
import { VerifyEmailChangeOtpModal } from '../verify-email-change-otp-modal/verify-email-change-otp-modal';
import type { AccountUser } from '../../models/account-profile.models';
import { AccountProfileService } from '../../services/account-profile.service';
import { toEgyptianMobileNational } from '../../utils/profile-phone-api';
import type { ProfileBaseline } from '../../models/profile-baseline.types';
import { phoneValidator } from '../../../../../../shared/forms/phone-validator';
import type { PhoneValue } from '../../../../../../shared/forms/phone-field.types';

@Component({
  selector: 'app-account-profile',
  imports: [
    ReactiveFormsModule,
    AuthInput,
    NgxPhoneField,
    LucideAngularModule,
    DeleteAccountModal,
    RequestEmailChangeModal,
    VerifyEmailChangeOtpModal,
  ],
  templateUrl: './account-profile.html',
  styleUrl: './account-profile.css',
  host: {
    class: 'flex min-h-0 flex-1 flex-col overflow-hidden',
  },
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ PencilLine }),
    },
  ],
})
export class AccountProfile implements OnInit, OnDestroy {
  private readonly accountProfile = inject(AccountProfileService);
  private readonly authState = inject(AuthState);
  private readonly toast = inject(ToastService);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('phoneInput') phoneInput?: ElementRef<HTMLInputElement>;

  private phoneApplyIntervalId: ReturnType<typeof setInterval> | null = null;

  readonly params = {
    initialCountry: 'eg',
    allowDropdown: true,
    allowedNumberTypes: ['MOBILE'],
    formatAsYouType: true,
    // @ts-ignore intl-tel-input option passed through ngx-phone-field
    loadUtils: async () => import('intl-tel-input/utils'),
  };

  readonly loadError = signal(false);
  readonly saving = signal(false);
  readonly hasUnsavedChanges = signal(false);
  readonly deleteModalOpen = signal(false);

  readonly requestEmailModalOpen = signal(false);
  readonly verifyEmailOtpModalOpen = signal(false);
  readonly pendingVerifyEmailChange = signal('');

  currentUser: AccountUser | null = null;

  private readonly baseline = signal<ProfileBaseline>({
    firstName: '',
    lastName: '',
    phone: '',
  });

  readonly profileForm = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    username: new FormControl({ value: '', disabled: true }, { nonNullable: true }),
    email: new FormControl({ value: '', disabled: true }, { nonNullable: true }),
    phone: new FormControl<PhoneValue>(null, {
      validators: [phoneValidator],
    }),
  });

  readonly formControls = this.profileForm.controls;

  get phoneErrorMessage(): string {
    const control = this.formControls.phone;
    if (!control.touched) return '';

    if (control.hasError('required')) return 'Phone is required.';
    if (control.hasError('invalidPhone')) return control.getError('invalidPhone').message;

    return '';
  }

  ngOnInit(): void {
    this.loadProfile();

    merge(
      this.formControls.firstName.valueChanges,
      this.formControls.lastName.valueChanges,
      this.formControls.phone.valueChanges,
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.recomputeDirty());
  }

  ngOnDestroy(): void {
    if (this.phoneApplyIntervalId !== null) {
      clearInterval(this.phoneApplyIntervalId);
      this.phoneApplyIntervalId = null;
    }
  }

  openChangeEmail(): void {
    this.pendingVerifyEmailChange.set('');
    this.verifyEmailOtpModalOpen.set(false);
    this.requestEmailModalOpen.set(true);
  }

  closeRequestEmailModal(): void {
    this.requestEmailModalOpen.set(false);
  }

  onEmailChangeRequested(email: string): void {
    this.pendingVerifyEmailChange.set(email);
    this.requestEmailModalOpen.set(false);
    this.verifyEmailOtpModalOpen.set(true);
  }

  closeVerifyEmailOtpModal(): void {
    this.verifyEmailOtpModalOpen.set(false);
    this.pendingVerifyEmailChange.set('');
  }

  onEditEmailFromOtp(): void {
    this.verifyEmailOtpModalOpen.set(false);
    this.requestEmailModalOpen.set(true);
  }

  onEmailConfirmed(user: AuthUser): void {
    this.currentUser = user;
    this.formControls.email.patchValue(user.email);
    this.syncAuthSession(user);
    this.pendingVerifyEmailChange.set('');
    this.verifyEmailOtpModalOpen.set(false);
    this.toast.success('Your email has been updated.');
  }

  openDeleteModal(): void {
    this.deleteModalOpen.set(true);
  }

  closeDeleteModal(): void {
    this.deleteModalOpen.set(false);
  }

  saveProfile(): void {
    if (!this.currentUser || !this.hasUnsavedChanges() || this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const raw = this.profileForm.getRawValue();
    const phoneValue = raw.phone as PhoneValue;
    const e164 = phoneValue?.getNumber()?.trim() ?? '';
    const phoneForApi = toEgyptianMobileNational(e164 || this.currentUser.phone || '');
    const payload = {
      firstName: raw.firstName.trim(),
      lastName: raw.lastName.trim(),
      profilePhoto: this.currentUser.profilePhoto ?? '',
      phone: phoneForApi,
    };

    this.saving.set(true);
    this.accountProfile
      .updateProfile(payload)
      .pipe(
        finalize(() => this.saving.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (user) => {
          this.currentUser = user;
          this.formControls.firstName.patchValue(user.firstName);
          this.formControls.lastName.patchValue(user.lastName);
          this.syncAuthSession(user);
          this.scheduleApplyPhone(user.phone, user);
        },
      });
  }

  private loadProfile(): void {
    this.accountProfile
      .getProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: (user) => {
        this.currentUser = user;
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
        this.formControls.username.patchValue(user.username);
        this.scheduleApplyPhone(user.phone, user);
      },
      error: () => this.loadError.set(true),
    });
  }

  private scheduleApplyPhone(e164: string | null | undefined, user: AccountUser): void {
    if (this.phoneApplyIntervalId !== null) {
      clearInterval(this.phoneApplyIntervalId);
      this.phoneApplyIntervalId = null;
    }

    const tryApply = () => {
      const applied = this.applyPhoneNumber(e164);
      if (applied) {
        if (this.phoneApplyIntervalId !== null) {
          clearInterval(this.phoneApplyIntervalId);
          this.phoneApplyIntervalId = null;
        }
        this.captureBaselineFromUser(user);
        return true;
      }
      return false;
    };

    afterNextRender(
      () => {
        if (tryApply()) return;
        if (this.phoneApplyIntervalId !== null) return;

        let tries = 0;
        this.phoneApplyIntervalId = setInterval(() => {
          tries++;
          if (tryApply() || tries > 40) {
            if (this.phoneApplyIntervalId !== null) {
              clearInterval(this.phoneApplyIntervalId);
              this.phoneApplyIntervalId = null;
            }
            if (tries > 40) {
              this.captureBaselineFromUser(user);
            }
          }
        }, 50);
      },
      { injector: this.injector }
    );
  }

  private applyPhoneNumber(e164: string | null | undefined): boolean {
    const el = this.phoneInput?.nativeElement;
    if (!el) {
      return false;
    }
    const iti = intlTelInput.getInstance(el);
    if (!iti) {
      return false;
    }
    const raw = e164 ?? '';
    iti.setNumber(raw);
    this.formControls.phone.setValue(iti, { emitModelToViewChange: false });
    this.formControls.phone.updateValueAndValidity({ emitEvent: false });

    void import('intl-tel-input/utils').then(() => {
      requestAnimationFrame(() => {
        const synced = intlTelInput.getInstance(el);
        if (!synced) return;
        this.formControls.phone.setValue(synced, { emitModelToViewChange: false });
        this.formControls.phone.updateValueAndValidity({ emitEvent: false });
        this.recomputeDirty();
      });
    });
    return true;
  }

  private captureBaselineFromUser(user: AccountUser): void {
    const fromPlugin = this.formControls.phone.value?.getNumber?.()?.trim() ?? '';
    const phone = toEgyptianMobileNational(fromPlugin || user.phone || '');
    this.baseline.set({
      firstName: this.formControls.firstName.value,
      lastName: this.formControls.lastName.value,
      phone,
    });
    this.recomputeDirty();
  }

  private recomputeDirty(): void {
    const phoneVal = this.formControls.phone.value;
    const e164 =
      phoneVal && typeof phoneVal === 'object' && 'getNumber' in phoneVal
        ? (phoneVal as Iti).getNumber() ?? ''
        : '';
    const currentNational = toEgyptianMobileNational(e164);
    const b = this.baseline();
    const dirty =
      this.formControls.firstName.value !== b.firstName ||
      this.formControls.lastName.value !== b.lastName ||
      currentNational !== b.phone;
    this.hasUnsavedChanges.set(dirty);
  }

  private syncAuthSession(user: AuthUser): void {
    const token = authSession.getToken();
    if (!token) return;
    authSession.setSession(token, user);
    this.authState.setUser(authSession.getUser());
  }
}
