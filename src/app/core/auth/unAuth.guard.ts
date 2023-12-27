import { Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';

export const UnAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const store: Store<AppState> = inject(Store<AppState>);
  const router: Router = inject(Router);
  const isAuthenticated: Signal<boolean> = toSignal(
    store.pipe(select(selectIsAuthenticated), take(1))
  );

  isAuthenticated() &&
    void router.navigate(['/p'], {
      queryParams: { redirectUrl: state.url },
    });
  return !isAuthenticated();
};
