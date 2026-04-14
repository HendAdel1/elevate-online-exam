import { AfterViewInit, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  isSubmitting = signal(false);
  message = signal('');

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

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting.set(true);
    this.message.set('');

    const { email } = this.form.value as { email: string };

    this.authService.sendEmail({ email }).subscribe({
      next: (response) => {
        this.message.set(response.message);
        this.router.navigate(['/auth/register/verify-otp'], { queryParams: { email } });
      },
      error: (err) => {
        this.message.set(err.error?.message || 'An error occurred');
      }
    }).add(() => {
      this.isSubmitting.set(false);
    });
  }
}
