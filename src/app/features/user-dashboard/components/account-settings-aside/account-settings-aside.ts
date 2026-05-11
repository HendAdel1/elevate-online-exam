import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  Lock,
  LogOut,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  UserCircle,
  UserRound,
} from 'lucide-angular';
import { AuthState } from '../../../../core/auth/auth-state';
import { AUTH_LOGIN_PATH } from '../../../../core/auth/role-redirect';

@Component({
  selector: 'app-account-settings-aside',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './account-settings-aside.html',
  host: {
    class: 'flex flex-col shrink-0',
  },
  providers: [
    
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ UserRound, Lock, LogOut, UserCircle }),
    },
  ],
})
export class AccountSettingsAside {
  private readonly authState = inject(AuthState);
  private readonly router = inject(Router);

  readonly profileLink = '/user-dashboard/account-settings';
  readonly changePasswordLink = '/user-dashboard/account-settings/change-password';

  logout(): void {
    this.authState.logout();
    void this.router.navigateByUrl(AUTH_LOGIN_PATH);
  }
}
