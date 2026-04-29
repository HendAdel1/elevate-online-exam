import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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