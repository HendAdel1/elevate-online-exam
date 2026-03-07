import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-link',
  imports: [],
  templateUrl: './auth-link.html',
  styleUrl: './auth-link.css',
})
export class AuthLink {
@Input() customClass = 'text-center';
}
