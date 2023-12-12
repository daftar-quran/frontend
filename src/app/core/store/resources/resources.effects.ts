import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as resourceActions from './resources.actions';
import * as resourceSelectors from './resources.selector';
import { map } from 'rxjs/operators';
import { ICalledRessources } from '@app/models';

@Injectable()
export class ResourcesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  setcalledRessourcesSelectorEffect = createEffect(
    () => {
      return this.store.select(resourceSelectors.selectCalledRessources).pipe(
        map((calledRessources: ICalledRessources) => {
          const result = Object.entries(calledRessources).filter(
            (entrie: [string, boolean]) =>
              entrie[1] === false && entrie[0] !== 'calledAll'
          );
          if (result.length === 0 && !calledRessources.calledAll) {
            this.store.dispatch(
              resourceActions.SetCalledRessources({
                ressource: 'calledAll',
                value: true,
              })
            );
          }
        })
      );
    },
    { dispatch: false }
  );
}
