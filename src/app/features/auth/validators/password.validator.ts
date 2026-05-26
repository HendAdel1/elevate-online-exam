import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const hasMinLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(value);

    const errors: ValidationErrors = {};

    if (!hasMinLength) errors['minlength'] = true;
    if (!hasUppercase) errors['uppercase'] = true;
    if (!hasNumber) errors['number'] = true;
    if (!hasSpecialChar) errors['specialChar'] = true;

    return Object.keys(errors).length ? errors : null;
  };
};

export const passwordMatchValidator = (
  passwordKey: string = 'password',
  confirmPasswordKey: string = 'confirmPassword',
  errorKey: string = 'passwordMismatch'
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const password = group.get(passwordKey);
    const confirmPassword = group.get(confirmPasswordKey);

    if (!password || !confirmPassword) return null;

    const passwordValue = password.value?.trim?.() ?? password.value ?? '';
    const confirmPasswordValue = confirmPassword.value?.trim?.() ?? confirmPassword.value ?? '';

    // If either field is empty, don't flag mismatch yet
    if (!passwordValue || !confirmPasswordValue) {
      if (confirmPassword.errors) {
        delete confirmPassword.errors[errorKey];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
      return null;
    }

    const mismatch = passwordValue !== confirmPasswordValue;

    if (mismatch) {
      confirmPassword.setErrors({
        ...(confirmPassword.errors || {}),
        [errorKey]: true,
      });
      return { [errorKey]: true };
    } else {
      if (confirmPassword.errors) {
        delete confirmPassword.errors[errorKey];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
      return null;
    }
  };
};