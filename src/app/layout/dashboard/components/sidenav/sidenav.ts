import { Component } from '@angular/core';
import { SidenavLogo } from "./components/sidenav-logo/sidenav-logo";
import { SidenavNavLinks } from "./components/sidenav-nav-links/sidenav-nav-links";
import { SidenavFooter } from "./components/sidenav-footer/sidenav-footer";
@Component({
  selector: 'app-sidenav',
  imports: [SidenavLogo, SidenavNavLinks, SidenavFooter],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {

}
