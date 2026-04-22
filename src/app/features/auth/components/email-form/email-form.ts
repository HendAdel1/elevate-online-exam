import { AfterViewInit, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthButton } from "../../../../shared/ui/auth-button/auth-button";
import { AuthService } from '../../../../../../projects/auth/src/lib/services/auth.service';

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [ReactiveFormsModule, AuthButton],
  templateUrl: './email-form.html',
  styleUrl: './email-form.css',
})
export class EmailForm implements AfterViewInit {

  @ViewChild('emailInput') emailInput!: ElementRef;

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    const focus = this.route.snapshot.queryParamMap.get('focus');
    if (focus === 'email') {
      this.emailInput.nativeElement.focus();
    }
  }

  get emailControl() {
    return this.form.controls.email;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const email = this.form.controls.email.value.trim().toLowerCase();

    this.authService.sendEmail({ email }).pipe(
      finalize(() => this.isSubmitting.set(false))
    ).subscribe({
      next: () => {
        this.successMessage.set('Verification code sent successfully.');
        this.router.navigate(['/auth/register/verify-otp'], { queryParams: { email } });
      },
      error: (err: { error?: { message?: string }; message?: string }) => {
        this.errorMessage.set(err?.error?.message ?? err?.message ?? 'Failed to send verification code.');
      },
    });
  }
}
