import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-verify-otp-form',
  imports: [AuthButton, RouterModule],
  templateUrl: './verify-otp-form.html',
  styleUrl: './verify-otp-form.css',
})
export class VerifyOtpForm implements OnInit, OnDestroy {

  //Timer
  remainingSeconds = 60;
  private intervalId!: any;
  private readonly STORAGE_KEY = 'otp_expiry';

  //OTP
  otpArray = Array(6);
  otpValues: string[] = Array(6).fill('');
  @ViewChildren('otp') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  ngOnInit(): void {
    // Step 1: Get expiry timestamp from localStorage or set new
    let expiry = localStorage.getItem(this.STORAGE_KEY);

    if (!expiry) {
      expiry = (Date.now() + 60_000).toString();
      localStorage.setItem(this.STORAGE_KEY, expiry);
    }

    const expiryTime = Number(expiry);

    // Step 2: Compute remaining milliseconds
    const computeRemaining = () => {
      const remainingMs = expiryTime - Date.now();
      this.remainingSeconds = Math.ceil(remainingMs / 1000);
      if (this.remainingSeconds <= 0) {
        this.remainingSeconds = 0;
        clearInterval(this.intervalId);
        localStorage.removeItem(this.STORAGE_KEY);
      }
    };

    // Step 3: Compute immediately so UI shows correct value on init
    computeRemaining();

    // Step 4: Use short interval for smooth countdown
    this.intervalId = setInterval(computeRemaining, 200);
  }

  ///////OTP digits/////////

  onInput(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Only allow digits
    input.value = value.replace(/[^0-9]/g, '');
    this.otpValues[index] = input.value;

    if (input.value && index < this.otpArray.length - 1) {
      // Move to next input
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      // Move focus to previous input
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }




  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
