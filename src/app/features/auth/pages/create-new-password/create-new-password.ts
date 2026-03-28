import { Component } from '@angular/core';
import { AuthTitle } from '../../../../shared/ui/auth-title/auth-title';
import { AuthLink } from '../../../../shared/ui/auth-link/auth-link';
import { RouterLink } from '@angular/router';
import { CreateNewPasswordForm } from "../../components/create-new-password-form/create-new-password-form";

@Component({
  selector: 'app-create-new-password',
  imports: [AuthTitle, AuthLink, RouterLink, CreateNewPasswordForm],
  templateUrl: './create-new-password.html',
  styleUrl: './create-new-password.css',
})
export class CreateNewPassword {

}
