import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class UnAuthGuard {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigate(['/p'], {
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
