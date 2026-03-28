import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { AuthLink } from "../../../../../../shared/ui/auth-link/auth-link";
import { EmailForm } from "../../../../components/email-form/email-form";

@Component({
  selector: 'app-email',
  imports: [AuthLink, EmailForm, RouterLink],
  templateUrl: './email.html',
  styleUrl: './email.css',
})
export class Email {

}
