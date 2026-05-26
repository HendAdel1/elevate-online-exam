import type { AbstractControl, ValidationErrors } from '@angular/forms';
import type { InvalidPhoneError, PhoneValue } from './phone-field.types';

export const phoneValidator = (
  control: AbstractControl<PhoneValue>
): ValidationErrors | null => {
  const phoneValue = control.value;

  if (!phoneValue?.getNumber()) return { required: true };

  if (!phoneValue.isValidNumber()) {
    return {
      invalidPhone: {
        message: 'Invalid phone number.',
      } satisfies InvalidPhoneError,
    };
  }

  return null;
};
