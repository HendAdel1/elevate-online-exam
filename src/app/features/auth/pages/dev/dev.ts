import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dev',
  imports: [RouterLink],
  templateUrl: './dev.html',
  styleUrl: './dev.css',
})
export class Dev {
panelOpen = false;

  togglePanel() {
    this.panelOpen = !this.panelOpen;
  }
}
