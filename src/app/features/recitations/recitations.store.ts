import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
// import { RouterParamsSelector } from 'app/core/store/router/router.selector';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { IRecitation } from './models';
import { RecitationsService } from './services/recitations.service';

export interface RecitationsState {
  allRecitations: IRecitation[];
  recitation: IRecitation;
}

export const initialRecitationsState: RecitationsState = {
  allRecitations: [],
  recitation: null,
};

@Injectable()
export class RecitationsStore extends ComponentStore<RecitationsState> {
  private recitationsService: RecitationsService = inject(RecitationsService);
  private router: Router = inject(Router);

  // SELECTORS
  public allRecitations$ = this.select(
    (state: RecitationsState) => state.allRecitations
  );
  public recitation$ = this.select(
    (state: RecitationsState) => state.recitation
  );

  constructor() {
    super(initialRecitationsState);
  }

  // UPDATERS

  /**
   * Sets the recitations and updates the filtered recitations based on the provided recitations array.
   *
   * @param {RecitationsState} state - The current state of the recitations.
   * @param {IRecitation[]} allRecitations - The new array of recitations to set.
   */
  public setRecitations = this.updater(
    (state: RecitationsState, allRecitations: IRecitation[]) => ({
      ...state,
      allRecitations,
    })
  );

  public initRecitation = () => this.patchState({ recitation: null });

  // EFFECTS
  public recitationsSearch = this.effect((trigger$) =>
    trigger$.pipe(switchMap(() => this.searchRecitations()))
  );

  public getRecitation = this.effect((trigger$) =>
    trigger$.pipe(
      // withLatestFrom(this.store.pipe(select(RouterParamsSelector))),
      switchMap(() =>
        this.recitationsService.getRecitation(1).pipe(
          tap((recitation: IRecitation) => this.patchState({ recitation })),
          catchError((error: HttpErrorResponse) => {
            this.router.navigate(['/p/settings/recitations']);
            return of(error);
          })
        )
      )
    )
  );

  public addRecitation = this.effect((recitation$: Observable<IRecitation>) =>
    recitation$.pipe(
      switchMap((recitation: IRecitation) =>
        this.recitationsService.addRecitation(recitation).pipe(
          switchMap(() => {
            void this.router.navigate(['/p/settings/recitations']);
            return this.searchRecitations();
          }),
          catchError((error: HttpErrorResponse) => of(error))
        )
      )
    )
  );

  public updateRecitation = this.effect(
    (recitation$: Observable<IRecitation>) =>
      recitation$.pipe(
        switchMap((recitation: IRecitation) =>
          this.recitationsService.updateRecitation(recitation).pipe(
            switchMap(() => {
              void this.router.navigate(['/p/settings/recitations']);
              return this.searchRecitations();
            }),
            catchError((error: HttpErrorResponse) => of(error))
          )
        )
      )
  );

  /**
   * Retrieves the recitations by calling the searchRecitations method of the recitationsService.
   * Updates the state with the retrieved recitations and handles any errors that occur.
   *
   * @returns {Observable<IRecitation[] | HttpErrorResponse>} - An Observable that emits the retrieved recitations or an HttpErrorResponse.
   */
  private searchRecitations(): Observable<IRecitation[] | HttpErrorResponse> {
    // Call the searchRecitations method of the recitationsService to get all recitations
    return this.recitationsService.searchRecitations().pipe(
      // When the recitations are returned, update the state to reflect all recitations and filtered recitations
      tap((allRecitations: IRecitation[]) => {
        this.setRecitations(allRecitations);
      }),
      catchError((error: HttpErrorResponse) => of(error))
    );
  }
}
