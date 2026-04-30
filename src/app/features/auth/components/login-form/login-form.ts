import { Component } from '@angular/core';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { CircleX, Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthInput } from '../../../../shared/ui/auth-input/auth-input';
import { AuthService } from '../../../../../../projects/auth/src/lib/services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-form',
  imports: [AuthButton, LucideAngularModule, RouterLink, ReactiveFormsModule, CommonModule, AuthInput],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ EyeOff, Eye, CircleX }),
  }]
})
export class LoginForm {

  loginForm: FormGroup;
  showPassword = false;
  loginError: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get controls() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginError) {
        this.loginError = null;
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.loginError = 'Something went wrong';
      return;
    }

    const payload = this.loginForm.value;

    this.isSubmitting = true;
    this.loginError = null;

    this.authService.login(payload).pipe(finalize(() => this.isSubmitting = false))
      .subscribe((res) => {
        // console.log(res);
        if (!res.token) {
          this.loginError = res.message || "Login failed";
          return;
        }

        sessionStorage.setItem('auth_token', res.token);
        this.router.navigate(['/auth/forgot-password']);
      });
  }

}
