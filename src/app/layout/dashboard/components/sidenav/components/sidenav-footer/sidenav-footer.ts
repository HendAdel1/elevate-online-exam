import { Component, HostListener } from '@angular/core';
import { Bolt, EllipsisVertical, LogOut, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, UserRound } from 'lucide-angular';

@Component({
  selector: 'app-sidenav-footer',
  imports: [LucideAngularModule],
  templateUrl: './sidenav-footer.html',
  styleUrl: './sidenav-footer.css',
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ EllipsisVertical, UserRound, Bolt, LogOut }),
  }]
})
export class SidenavFooter {

  isOpen = false;

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event) {
    this.isOpen = false;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
