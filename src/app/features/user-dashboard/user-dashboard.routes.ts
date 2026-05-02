import { Routes } from '@angular/router';
import { DashboardLayout } from '../../layout/dashboard/dashboard-layout/dashboard-layout';

export const userDashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'diplomas',
    //     pathMatch: 'full'
    //   },

    //   {
    //     path: 'diplomas',
    //     loadComponent: () =>
    //       import('./pages/diplomas/diplomas.component')
    //         .then(m => m.DiplomasComponent)
    //   },
    // ]
  }
];