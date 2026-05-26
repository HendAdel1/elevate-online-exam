import { Component, Output } from '@angular/core';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { AuthInput } from '../../../../shared/ui/auth-input/auth-input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../projects/auth/src/lib/services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthError } from '../../../../shared/ui/auth-error/auth-error';

@Component({
  selector: 'app-forgot-password-form',
  imports: [AuthButton, AuthInput, ReactiveFormsModule, AuthError],
  templateUrl: './forgot-password-form.html',
  styleUrl: './forgot-password-form.css',
})
export class ForgotPasswordForm {

    
form = new FormGroup({
  email: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  }),
});

get emailControl() {
  return this.form.controls.email;
}

  isSubmitting = false;
  errorMessage: string | null = null;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onSubmit() {
    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched();
      return;
    }

    const email = this.emailControl.value.trim().toLowerCase();

    this.isSubmitting = true;
    this.errorMessage = null;

    this.authService.forgotPassword({email, redirectUrl: `${window.location.origin}/auth/create-new-password`}).pipe(finalize(() => this.isSubmitting = false))
    .subscribe((res) =>{
      sessionStorage.setItem('auth_forgot_password_email', email);
      this.router.navigate(['/auth/verify-email'], { state: {email} } )

      if(!res.resetToken){
        this.errorMessage = res.message || 'Something went wrong';
        return;
      }
    });

  }
}
