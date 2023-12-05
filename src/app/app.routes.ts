import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    //component: PublicLayoutComponent,
    // canActivate: [UnAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/authentication/authentication.routes'),
      },
    ],
  },
];
