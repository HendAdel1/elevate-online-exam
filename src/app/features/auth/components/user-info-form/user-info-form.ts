import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPhoneField } from 'ngx-phone-field';
import { AuthButton } from "../../../../shared/ui/auth-button/auth-button";

@Component({
  selector: 'app-user-info-form',
  imports: [ReactiveFormsModule, NgxPhoneField, AuthButton],
  templateUrl: './user-info-form.html',
  styleUrl: './user-info-form.css',
})
export class UserInfoForm {

  userInfoForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)]),
    phone: new FormControl('', Validators.required),
  });

  params = {
    initialCountry: 'eg',
    allowDropdown: true,
    formatAsYouType: true,
    // @ts-ignore
    loadUtilsOnInit: async () => import('intl-tel-input/utils'), // load utils script for formatting and validation
  };

  onSubmit() {
    if (this.userInfoForm.valid) {
      console.log('User info submitted:', this.userInfoForm.value);
      // TODO: Emit to parent or dispatch to store
      // this.formSubmitted.emit(this.userInfoForm.value);
      alert('Form submitted successfully!');
    } else {
      console.log('Form invalid');
    }
  }
}
