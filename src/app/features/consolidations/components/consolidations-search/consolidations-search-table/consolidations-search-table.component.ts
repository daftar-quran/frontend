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
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MIN_PAGE_SIZE_OPTIONS } from '@app/config';
import { IConsolidation } from 'app/features/consolidations/models';
import { Observable, tap } from 'rxjs';
import { ConsolidationsStore } from '../../../consolidations.store';

@Component({
  selector: 'app-consolidations-search-table',
  templateUrl: './consolidations-search-table.component.html',
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
    MatTooltipModule,
  ],
})
export class ConsolidationsSearchTableComponent {
  private consolidationsStore = inject(ConsolidationsStore);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public MIN_PAGE_SIZE_OPTIONS = MIN_PAGE_SIZE_OPTIONS;
  public columns = [
    'page',
    'date',
    'sura',
    'chaikh',
    'appreciation',
    'observation',
    'tikrar',
  ];
  public consolidations$: Observable<IConsolidation[]> =
    this.consolidationsStore.allConsolidations$.pipe(
      tap((consolidations) => {
        if (this.consolidations) {
          // If consolidations already exist, update the data property with new consolidations
          this.consolidations.data = [...consolidations];
        } else {
          // If consolidations do not exist, create a new MatTableDataSource with consolidations as data
          this.consolidations = new MatTableDataSource<IConsolidation>(
            consolidations
          );
        }

        this.cdr.detectChanges();
        this.consolidations.paginator = this.paginator;
        this.consolidations.sort = this.sort;
      })
    );

  public consolidations: MatTableDataSource<IConsolidation>;

  public addTikrar(element: IConsolidation): void {
    //call add Tikrar api
    element.tikrar++;
  }
  public subtractTikrar(element: IConsolidation): void {
    //call subtract Tikrar api
    element.tikrar--;
  }
}
