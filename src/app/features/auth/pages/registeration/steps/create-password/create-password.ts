import { Component } from '@angular/core';

import { CreatePasswordForm } from '../../../../components/create-password-form/create-password-form';
import { AuthSubTitle } from "../../../../../../shared/ui/auth-sub-title/auth-sub-title";

@Component({
  selector: 'app-create-password',
  imports: [CreatePasswordForm, AuthSubTitle],
  templateUrl: './create-password.html',
  styleUrl: './create-password.css',
})
export class CreatePassword {}
