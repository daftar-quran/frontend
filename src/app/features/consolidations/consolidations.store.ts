import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
// import { RouterParamsSelector } from 'app/core/store/router/router.selector';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { IConsolidation } from './models';
import { ConsolidationsService } from './services/consolidations.service';

export interface ConsolidationsState {
  allConsolidations: IConsolidation[];
  consolidation: IConsolidation;
}

export const initialConsolidationsState: ConsolidationsState = {
  allConsolidations: [],
  consolidation: null,
};

@Injectable()
export class ConsolidationsStore extends ComponentStore<ConsolidationsState> {
  private consolidationsService: ConsolidationsService = inject(
    ConsolidationsService
  );
  private router: Router = inject(Router);

  // SELECTORS
  public allConsolidations$ = this.select(
    (state: ConsolidationsState) => state.allConsolidations
  );
  public consolidation$ = this.select(
    (state: ConsolidationsState) => state.consolidation
  );

  constructor() {
    super(initialConsolidationsState);
  }

  // UPDATERS

  /**
   * Sets the consolidations and updates the filtered consolidations based on the provided consolidations array.
   *
   * @param {ConsolidationsState} state - The current state of the consolidations.
   * @param {IConsolidation[]} allConsolidations - The new array of consolidations to set.
   */
  public setConsolidations = this.updater(
    (state: ConsolidationsState, allConsolidations: IConsolidation[]) => ({
      ...state,
      allConsolidations,
    })
  );

  public initConsolidation = () => this.patchState({ consolidation: null });

  // EFFECTS
  public consolidationsSearch = this.effect((trigger$) =>
    trigger$.pipe(switchMap(() => this.searchConsolidations()))
  );

  public getConsolidation = this.effect((trigger$) =>
    trigger$.pipe(
      // withLatestFrom(this.store.pipe(select(RouterParamsSelector))),
      switchMap(() =>
        this.consolidationsService.getConsolidation(1).pipe(
          tap((consolidation: IConsolidation) =>
            this.patchState({ consolidation })
          ),
          catchError((error: HttpErrorResponse) => {
            this.router.navigate(['/p/settings/consolidations']);
            return of(error);
          })
        )
      )
    )
  );

  public addConsolidation = this.effect(
    (consolidation$: Observable<IConsolidation>) =>
      consolidation$.pipe(
        switchMap((consolidation: IConsolidation) =>
          this.consolidationsService.addConsolidation(consolidation).pipe(
            switchMap(() => {
              void this.router.navigate(['/p/settings/consolidations']);
              return this.searchConsolidations();
            }),
            catchError((error: HttpErrorResponse) => of(error))
          )
        )
      )
  );

  public updateConsolidation = this.effect(
    (consolidation$: Observable<IConsolidation>) =>
      consolidation$.pipe(
        switchMap((consolidation: IConsolidation) =>
          this.consolidationsService.updateConsolidation(consolidation).pipe(
            switchMap(() => {
              void this.router.navigate(['/p/settings/consolidations']);
              return this.searchConsolidations();
            }),
            catchError((error: HttpErrorResponse) => of(error))
          )
        )
      )
  );

  /**
   * Retrieves the consolidations by calling the searchConsolidations method of the consolidationsService.
   * Updates the state with the retrieved consolidations and handles any errors that occur.
   *
   * @returns {Observable<IConsolidation[] | HttpErrorResponse>} - An Observable that emits the retrieved consolidations or an HttpErrorResponse.
   */
  private searchConsolidations(): Observable<
    IConsolidation[] | HttpErrorResponse
  > {
    // Call the searchConsolidations method of the consolidationsService to get all consolidations
    return this.consolidationsService.searchConsolidations().pipe(
      // When the consolidations are returned, update the state to reflect all consolidations and filtered consolidations
      tap((allConsolidations: IConsolidation[]) => {
        this.setConsolidations(allConsolidations);
      }),
      catchError((error: HttpErrorResponse) => of(error))
    );
  }
}
