import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { UnAuthGuard } from './core/auth/unAuth.guard';
import { PrivateLayoutComponent } from './layout/private-layout/private-layout.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    canActivate: [UnAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/authentication/authentication.routes'),
      },
    ],
  },

  {
    path: 'p',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'recitations',
        pathMatch: 'full',
      },
      {
        path: 'recitations',
        loadChildren: () => import('./features/recitations/recitations.routes'),
      },
      {
        path: 'consolidations',
        loadChildren: () =>
          import('./features/consolidations/consolidations.routes'),
      },
    ],
  },
];
