import { Component } from '@angular/core';
import { VerifyOtpForm } from '../../../../components/verify-otp-form/verify-otp-form';
import { AuthSubTitle } from "../../../../../../shared/ui/auth-sub-title/auth-sub-title";

@Component({
  selector: 'app-verify-otp',
  imports: [VerifyOtpForm, AuthSubTitle],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css',
})
export class VerifyOtp {}
