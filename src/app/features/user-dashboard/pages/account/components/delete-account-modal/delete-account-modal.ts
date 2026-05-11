import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  AlertTriangle,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  X,
} from 'lucide-angular';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthState } from '../../../../../../core/auth/auth-state';
import { AUTH_LOGIN_PATH } from '../../../../../../core/auth/role-redirect';
import { AccountProfileService } from '../../services/account-profile.service';

@Component({
  selector: 'app-delete-account-modal',
  imports: [LucideAngularModule],
  templateUrl: './delete-account-modal.html',
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ X, AlertTriangle }),
    },
  ],
})
export class DeleteAccountModal {
  private readonly accountProfile = inject(AccountProfileService);
  private readonly authState = inject(AuthState);
  private readonly router = inject(Router);

  @Input({ required: true }) open = false;
  @Output() readonly closed = new EventEmitter<void>();

  deleting = false;
  errorMessage = '';

  close(): void {
    this.errorMessage = '';
    this.closed.emit();
  }

  confirmDelete(): void {
    if (this.deleting) return;
    this.deleting = true;
    this.errorMessage = '';
    this.accountProfile
      .deleteAccount()
      .pipe(finalize(() => (this.deleting = false)))
      .subscribe({
        next: () => {
          this.authState.logout();
          void this.router.navigateByUrl(AUTH_LOGIN_PATH);
        },
        error: () => {
          this.errorMessage = 'Could not delete account. Try again or contact support.';
        },
      });
  }
}
