import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { UnAuthGuard } from './core/auth/unAuth.guard';
import { PrivateLayoutComponent } from './layout/private-layout/private-layout.component';
import { AuthGuard } from './core/auth/auth.guard';

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
      {
        path: 'p',
        component: PrivateLayoutComponent,
        canActivate: [AuthGuard],
        children: [],
      },
    ],
  },
];
