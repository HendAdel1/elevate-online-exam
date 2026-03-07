import { Component, Input } from '@angular/core';
import { LucideAngularModule, MoveRight } from 'lucide-angular';

@Component({
  selector: 'app-auth-button',
  imports: [LucideAngularModule],
  templateUrl: './auth-button.html',
  styleUrl: './auth-button.css',
})
export class AuthButton {
  
  readonly MoveRight = MoveRight;
  @Input() hasIcon: boolean = false;

}
