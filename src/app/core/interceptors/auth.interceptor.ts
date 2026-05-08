import { HttpInterceptorFn } from '@angular/common/http';
import { authSession } from '../auth/auth-session';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = authSession.getToken();

  if (!token) {
    return next(req);
  }

  const authenticatedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authenticatedRequest);
};
