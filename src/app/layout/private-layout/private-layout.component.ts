import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Logout } from '../../core/store/auth/auth.actions';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-components-layout',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: 'private-layout.component.html',
  styleUrls: ['private-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayoutComponent implements OnDestroy {
  private store: Store = inject(Store);
  public changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  public media: MediaMatcher = inject(MediaMatcher);
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  constructor() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  logout() {
    this.store.dispatch(Logout({}));
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
