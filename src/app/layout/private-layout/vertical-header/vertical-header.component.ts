import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import * as authActions from '../../../core/store/auth/auth.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-vertical-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatBadgeModule, MatIconModule],
  templateUrl: './vertical-header.component.html',
  styleUrls: ['./vertical-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalAppHeaderComponent {
  public store = inject(Store<AppState>);

  /**
   * Déconnexion de l'utilisateur
   * @returns void
   */
  public logout(): void {
    this.store.dispatch(authActions.Logout({}));
  }
}
