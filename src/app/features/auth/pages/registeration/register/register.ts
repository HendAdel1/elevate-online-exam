import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthTitle } from '../../../../../shared/ui/auth-title/auth-title';

@Component({
  selector: 'app-register',
  imports: [AuthTitle, RouterOutlet],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {}
