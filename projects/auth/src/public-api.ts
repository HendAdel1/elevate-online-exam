/*
 * Public API Surface of auth
 */

// API contracts and implementations
export * from './lib/api/auth.api';
export * from './lib/api/auth-http.api';

// Service contracts and implementations
export * from './lib/services/auth.service';
export * from './lib/services/auth-default.service';

// Public enums
export * from './lib/enums/auth-endpoints';
export * from './lib/enums/user-role';

// Public request models
export * from './lib/models/requests/send-email.request';
export * from './lib/models/requests/verify-email.request';
export * from './lib/models/requests/register.request';
export * from './lib/models/requests/login.request';
export * from './lib/models/requests/forgot-password.request';
export * from './lib/models/requests/reset-password.request';

// Public response models
export * from './lib/models/responses/send-email.response';
export * from './lib/models/responses/verify-email.response';
export * from './lib/models/responses/register.response';
export * from './lib/models/responses/login.response';
export * from './lib/models/responses/forgot-password.response';
export * from './lib/models/responses/reset-password.response';
