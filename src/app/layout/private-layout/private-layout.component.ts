import { Router, RouterOutlet } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
  ViewChild,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { selectCalledRessources } from '../../core/store/resources/resources.selector';
import { ICalledRessources } from '@app/models';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VerticalAppHeaderComponent } from './vertical-header/vertical-header.component';
import {
  GetMushafs,
  GetSurahs,
} from '../../core/store/resources/resources.actions';

/** @title Responsive sidenav */
@Component({
  selector: 'app-components-layout',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgClass,
    NgForOf,
    RouterOutlet,
    VerticalAppHeaderComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: 'private-layout.component.html',
  styleUrls: ['private-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayoutComponent implements OnInit {
  private ngZone = inject(NgZone);

  @ViewChild('sidenavContent') sidenavContent: MatSidenavContent;
  mobileQuery: MediaQueryList;
  sidebarOpened = false;
  private subscription = new Subscription();
  public calledRessources$: Observable<ICalledRessources> = this.store.select(
    selectCalledRessources
  );
  public displayButton: WritableSignal<boolean> = signal<boolean>(false);

  constructor(
    public router: Router,
    public store: Store
  ) {}

  /**
   * Scroll to Top
   */
  scrollToTop() {
    this.sidenavContent.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {
    this.store.dispatch(GetSurahs());
    this.store.dispatch(GetMushafs());
  }
}
