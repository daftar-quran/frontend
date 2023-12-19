import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { IRecitation } from './models';
import { RecitationsService } from './services/recitations.service';

export interface RecitationsState {}

export const initialRecitationsState: RecitationsState = {};

@Injectable()
export class RecitationsStore extends ComponentStore<RecitationsState> {
  private recitationsService: RecitationsService = inject(RecitationsService);
  private router: Router = inject(Router);

  constructor() {
    super(initialRecitationsState);
  }

  ////////// EFFECTS //////////
  public addRecitation = this.effect((recitation$: Observable<IRecitation>) =>
    recitation$.pipe(
      switchMap((recitation: IRecitation) =>
        this.recitationsService.addRecitation(recitation).pipe(
          tap(() => void this.router.navigate(['/p/settings/recitations'])),
          catchError((error: HttpErrorResponse) => of(error))
        )
      )
    )
  );
}
