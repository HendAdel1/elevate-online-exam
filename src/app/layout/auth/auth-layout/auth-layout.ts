import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthSidebar } from "../auth-sidebar/auth-sidebar";
import { Dev } from '../../../features/auth/pages/dev/dev';

@Component({
  selector: 'app-auth-layout',
  imports: [CommonModule, RouterOutlet, AuthSidebar, Dev],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {

}
