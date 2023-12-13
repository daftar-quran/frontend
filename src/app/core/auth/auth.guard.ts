import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map((isAuthenticated: boolean) => {
        return true;
        if (!isAuthenticated) {
          this.router.navigate(['/login'], {
            queryParams: { redirectUrl: state.url },
          });
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
