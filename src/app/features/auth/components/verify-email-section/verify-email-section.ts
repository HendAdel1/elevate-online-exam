import { Component } from '@angular/core';

@Component({
  selector: 'app-verify-email-section',
  imports: [],
  templateUrl: './verify-email-section.html',
  styleUrl: './verify-email-section.css',
})
export class VerifyEmailSection {

  email: string = '';

  constructor(){
    const state = history.state;
    this.email = state?.email ?? 'user@example.com.'
  }
}
