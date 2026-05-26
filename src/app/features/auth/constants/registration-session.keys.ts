// Email address persisted through verify-OTP / registration funnel
export const VERIFY_EMAIL_STORAGE_KEY = 'auth_verify_email';

// Set after OTP verification; allows navigating to user-info step.
export const USER_INFO_ACCESS_STORAGE_KEY = 'auth_user_info_access';

// Saved user-profile fields between registration steps
export const USER_INFO_STORAGE_KEY = 'auth_user_info';

// When true, client navigate to create-password step
export const CREATE_PASSWORD_ACCESS_STORAGE_KEY = 'auth_create_password_access';
