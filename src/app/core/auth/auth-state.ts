import { Injectable, computed, signal } from '@angular/core';
import { UserRole } from '../../../../projects/auth/src/lib/enums/user-role';
import { User } from '../../../../projects/auth/src/lib/models/responses/user.response';
import { AuthUser, authSession } from './auth-session';

@Injectable({ providedIn: 'root' })
export class AuthState {
  private readonly _user = signal<AuthUser | null>(authSession.getUser());

  readonly user = this._user.asReadonly();
  readonly role = computed(() => this._user()?.role ?? null);
  readonly isAuthenticated = computed(() => this._user() !== null);

  login(token: string, user: User | AuthUser): void {
    authSession.setSession(token, user);
    this._user.set(authSession.getUser());
  }

  setUser(user: AuthUser | null): void {
    if (user) {
      const token = authSession.getToken();
      if (token) {
        authSession.setSession(token, user);
      }
    }
    this._user.set(user);
  }

  logout(): void {
    authSession.clear();
    this._user.set(null);
  }

  hasRole(role: UserRole): boolean {
    return this.role() === role;
  }
}
