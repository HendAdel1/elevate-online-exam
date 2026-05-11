import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import type {
  AccountUser,
  ChangePasswordRequestBody,
  ChangePasswordResponseBody,
  EmailChangeRequestBody,
  EmailChangeRequestResponse,
  EmailConfirmBody,
  EmailConfirmResponseBody,
  PatchProfileRequestBody,
  PatchProfileResponseBody,
} from '../models/account-profile.models';

function unwrapUserPayload(body: unknown): AccountUser {
  if (body && typeof body === 'object') {
    const o = body as Record<string, unknown>;
    if ('payload' in o && o['payload'] && typeof o['payload'] === 'object') {
      const p = o['payload'] as Record<string, unknown>;
      if ('user' in p && p['user'] && typeof p['user'] === 'object') {
        return p['user'] as AccountUser;
      }
    }
    if ('user' in o && o['user'] && typeof o['user'] === 'object') {
      return o['user'] as AccountUser;
    }
  }
  return body as AccountUser;
}

function unwrapPatchResponse(body: unknown): AccountUser {
  if (body && typeof body === 'object' && 'user' in body) {
    return (body as PatchProfileResponseBody).user;
  }
  return unwrapUserPayload(body);
}

function unwrapEmailConfirm(body: unknown): AccountUser {
  if (body && typeof body === 'object' && 'user' in body) {
    return (body as EmailConfirmResponseBody).user;
  }
  return unwrapUserPayload(body);
}

@Injectable({
  providedIn: 'root',
})
export class AccountProfileService {
  private readonly http = inject(HttpClient);

  getProfile(): Observable<AccountUser> {
    return this.http
      .get<unknown>(`${environment.apiBaseUrl}/users/profile`)
      .pipe(map((body) => unwrapUserPayload(body)));
  }

  updateProfile(body: PatchProfileRequestBody): Observable<AccountUser> {
    return this.http
      .patch<unknown>(`${environment.apiBaseUrl}/users/profile`, body)
      .pipe(map((b) => unwrapPatchResponse(b)));
  }

  requestEmailChange(body: EmailChangeRequestBody): Observable<EmailChangeRequestResponse> {
    return this.http.post<EmailChangeRequestResponse>(
      `${environment.apiBaseUrl}/users/email/request`,
      body
    );
  }

  confirmEmailChange(body: EmailConfirmBody): Observable<AccountUser> {
    return this.http
      .post<unknown>(`${environment.apiBaseUrl}/users/email/confirm`, body)
      .pipe(map((b) => unwrapEmailConfirm(b)));
  }

  changePassword(body: ChangePasswordRequestBody): Observable<ChangePasswordResponseBody> {
    return this.http.post<ChangePasswordResponseBody>(
      `${environment.apiBaseUrl}/users/change-password`,
      body
    );
  }

  deleteAccount(): Observable<unknown> {
    return this.http.delete(`${environment.apiBaseUrl}/users`);
  }
}
