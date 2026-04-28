import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iti } from 'intl-tel-input';
import { NgxPhoneField } from 'ngx-phone-field';
import { AuthButton } from "../../../../shared/ui/auth-button/auth-button";

const USER_INFO_STORAGE_KEY = 'auth_user_info';
type PhoneValue = Iti | null;

type InvalidPhoneError = {
  message: string;
};

const phoneValidator = (control: AbstractControl<PhoneValue>): ValidationErrors | null => {
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

@Component({
  selector: 'app-user-info-form',
  imports: [ReactiveFormsModule, NgxPhoneField, AuthButton],
  templateUrl: './user-info-form.html',
  styleUrl: './user-info-form.css',
})
export class UserInfoForm {

  constructor(private router: Router) {}

  userInfoForm = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]*$/),
      ],
    }),
    phone: new FormControl<PhoneValue>(null, {
      validators: [phoneValidator],
    }),
  });

  
  params = {
    initialCountry: 'eg',
    allowDropdown: true,
    allowedNumberTypes: ['MOBILE'],
    formatAsYouType: true,
    // @ts-ignore
    loadUtils: async () => import('intl-tel-input/utils'),
  };

    readonly formControls = this.userInfoForm.controls;


  // error messages
  get firstNameErrorMessage(): string {
    const control = this.formControls.firstName;
    if (!control?.touched) return '';

    if (control.hasError('required')) return 'First name is required.';
    if (control.hasError('minlength')) return 'Must be at least 2 characters.';

    return '';
  }

  get lastNameErrorMessage(): string {
    const control = this.formControls.lastName;
    if (!control?.touched) return '';

    if (control.hasError('required')) return 'Last name is required.';
    if (control.hasError('minlength')) return 'Must be at least 2 characters.';

    return '';
  }

  get usernameErrorMessage(): string {
    const control = this.formControls.username;
    if (!control?.touched) return '';

    if (control.hasError('required')) return 'Username is required.';
    if (control.hasError('minlength')) return 'Must be at least 3 characters.';
    if (control.hasError('pattern')) {
      return 'Username must start with a letter and only contain letters, numbers, and underscores.';
    }

    return '';
  }

  get phoneErrorMessage(): string {
    const control = this.formControls.phone;
    if (!control?.touched) return '';

    if (control.hasError('required')) return 'Phone is required.';
    if (control.hasError('invalidPhone')) return control.getError('invalidPhone').message;

    return '';
  }

  // ===== submit =====
  onSubmit() {
    if (this.userInfoForm.invalid) {
      this.userInfoForm.markAllAsTouched();
      return;
    }
  
    const raw = this.userInfoForm.getRawValue();
  
    const phoneValue = raw.phone as PhoneValue;
  
    const formattedPhone = phoneValue?.getNumber() ?? null;
  
    const payload = {
      ...raw,
      phone: formattedPhone,
    };
  
    sessionStorage.setItem(
      USER_INFO_STORAGE_KEY,
      JSON.stringify(payload)
    );
  
    this.router.navigate(['/auth/register/create-password']);
  }
  
}



