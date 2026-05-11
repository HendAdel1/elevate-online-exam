import { Component, HostListener, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  Bolt,
  EllipsisVertical,
  LogOut,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  UserRound,
} from 'lucide-angular';
import { AuthState } from '../../../../../../core/auth/auth-state';
import { AUTH_LOGIN_PATH } from '../../../../../../core/auth/role-redirect';
import { UserRole } from '../../../../../../../../projects/auth/src/lib/enums/user-role';

const FALLBACK_AVATAR = 'images/logo-black.svg';

@Component({
  selector: 'app-sidenav-footer',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './sidenav-footer.html',
  styleUrl: './sidenav-footer.css',
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ EllipsisVertical, UserRound, Bolt, LogOut }),
    },
  ],
})
export class SidenavFooter {
  private readonly authState = inject(AuthState);
  private readonly router = inject(Router);

  isOpen = false;

  readonly user = this.authState.user;
  readonly isAdmin = computed(() => this.authState.role() === UserRole.ADMIN);
  readonly displayName = computed(() => this.user()?.firstName?.trim() || 'Guest');
  readonly displayEmail = computed(() => this.user()?.email?.trim() || '');
  readonly avatarUrl = computed(() => this.user()?.profilePhoto?.trim() || FALLBACK_AVATAR);

  @HostListener('document:click')
  closeOnOutsideClick() {
    this.isOpen = false;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authState.logout();
    this.router.navigateByUrl(AUTH_LOGIN_PATH);
  }
}
