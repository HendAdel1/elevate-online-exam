import { HttpInterceptorFn } from '@angular/common/http';
import { authSession } from '../auth/auth-session';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = authSession.getToken();

  const request = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(request);
};
