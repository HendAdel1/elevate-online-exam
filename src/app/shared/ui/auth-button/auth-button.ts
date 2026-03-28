import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-auth-button',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './auth-button.html',
  styleUrl: './auth-button.css',
})
export class AuthButton {

  readonly ChevronRight = ChevronRight;

  @Input() hasIcon: boolean = false;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  @Input() type: 'button' | 'submit' = 'button'

  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
}
