import { Component } from '@angular/core';
import { GraduationCap, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, UserRound } from 'lucide-angular';

@Component({
  selector: 'app-sidenav-nav-links',
  imports: [LucideAngularModule],
  templateUrl: './sidenav-nav-links.html',
  styleUrl: './sidenav-nav-links.css',
   providers:[{
        provide: LUCIDE_ICONS,
        multi: true,
        useValue: new LucideIconProvider({GraduationCap, UserRound}),
      }]
})
export class SidenavNavLinks {

  activeRoute = 'diplomas';

  links = [
    { name: 'Diplomas', icon: 'graduation-cap', route: 'diplomas' },
    { name: 'Account Settings', icon: 'user-round', route: 'account-settings' }
  ];


}
