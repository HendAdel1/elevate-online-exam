import { Component } from '@angular/core';
import { LucideAngularModule, MoveLeft } from 'lucide-angular';

@Component({
  selector: 'app-auth-back-button',
  imports: [LucideAngularModule],
  templateUrl: './auth-back-button.html',
  styleUrl: './auth-back-button.css',
})
export class AuthBackButton {
  readonly MoveLeft = MoveLeft;
}
