import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ChevronRight,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  X,
} from 'lucide-angular';
import { finalize } from 'rxjs';
import { AccountProfileService } from '../../services/account-profile.service';

@Component({
  selector: 'app-request-email-change-modal',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './request-email-change-modal.html',
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ X, ChevronRight }),
    },
  ],
})
export class RequestEmailChangeModal implements OnChanges {
  private readonly accountProfile = inject(AccountProfileService);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true }) open = false;
  @Input() initialEmail = '';
  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly emailRequestSuccess = new EventEmitter<string>();

  submitting = false;
  apiMessage = '';

  readonly emailForm = new FormGroup({
    newEmail: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) {
      this.apiMessage = '';
      this.submitting = false;
      this.emailForm.reset({ newEmail: '' }, { emitEvent: false });
      const seed = this.initialEmail?.trim() ?? '';
      if (seed) {
        this.emailForm.patchValue({ newEmail: seed });
      }
    }
  }

  close(): void {
    this.closed.emit();
  }

  submitNewEmail(): void {
    if (this.emailForm.invalid || this.submitting) {
      this.emailForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.apiMessage = '';
    const newEmail = this.emailForm.controls.newEmail.value.trim();

    this.accountProfile
      .requestEmailChange({ newEmail })
      .pipe(finalize(() => (this.submitting = false)), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.emailRequestSuccess.emit(newEmail),
        error: () => {
          this.apiMessage = 'Could not send verification code. Try again.';
        },
      });
  }
}
