import { Component } from '@angular/core';
import { Sidenav } from '../components/sidenav/sidenav';
import { RouterOutlet } from '@angular/router';
import { DashboardHeader } from '../components/dashboard-header/dashboard-header';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-dashboard-layout',
  imports: [Sidenav, Breadcrumb, DashboardHeader, RouterOutlet],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {

}
