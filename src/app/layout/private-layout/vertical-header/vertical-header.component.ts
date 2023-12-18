import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import { Logout } from '../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-vertical-header',
  templateUrl: './vertical-header.component.html',
  styleUrls: ['./vertical-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatBadgeModule, MatIconModule],
})
export class VerticalAppHeaderComponent {
  public store = inject(Store<AppState>);

  /**
   * Déconnexion de l'utilisateur
   * @returns void
   */
  public logout(): void {
    this.store.dispatch(Logout({}));
  }
}
