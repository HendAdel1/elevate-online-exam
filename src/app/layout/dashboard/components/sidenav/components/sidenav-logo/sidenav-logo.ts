import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brand } from "../../../../../../shared/components/brand/brand";

@Component({
  selector: 'app-sidenav-logo',
  imports: [Brand],
  templateUrl: './sidenav-logo.html',
  styleUrl: './sidenav-logo.css',
})
export class SidenavLogo {
  @Input() isCollapsed = false;
  @Output() toggle = new EventEmitter<void>();
}
