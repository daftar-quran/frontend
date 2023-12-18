import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MIN_PAGE_SIZE_OPTIONS } from '@app/config';
import { IRecitation } from 'app/features/recitations/models';
import { Observable, tap } from 'rxjs';
import { RecitationsStore } from '../../../recitations.store';

@Component({
  selector: 'app-recitations-search-table',
  templateUrl: './recitations-search-table.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgClass,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class RecitationsSearchTableComponent {
  private recitationsStore = inject(RecitationsStore);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public MIN_PAGE_SIZE_OPTIONS = MIN_PAGE_SIZE_OPTIONS;
  public columns = ['page', 'date', 'sura', 'tikrar', 'actions'];
  public recitations$: Observable<IRecitation[]> =
    this.recitationsStore.allRecitations$.pipe(
      tap((recitations) => {
        if (this.recitations) {
          // If recitations already exist, update the data property with new recitations
          this.recitations.data = [...recitations];
        } else {
          // If recitations do not exist, create a new MatTableDataSource with recitations as data
          this.recitations = new MatTableDataSource<IRecitation>(recitations);
        }

        this.cdr.detectChanges();
        this.recitations.paginator = this.paginator;
        this.recitations.sort = this.sort;
      })
    );

  public recitations: MatTableDataSource<IRecitation>;

  /**
   * Navigates to the permissions page for the given recitation.
   * @param recitation IRecitation.
   */
  public goToDetails(recitation: IRecitation): void {
    this.router.navigate(['/p/settings/recitations', recitation.id]);
  }
}
