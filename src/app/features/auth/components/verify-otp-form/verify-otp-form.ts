import { Component } from '@angular/core';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-verify-otp-form',
  imports: [AuthButton, RouterModule],
  templateUrl: './verify-otp-form.html',
  styleUrl: './verify-otp-form.css',
})
export class VerifyOtpForm {

}
