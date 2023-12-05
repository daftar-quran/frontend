import { CalledRessources, ICalledRessources, IQlError } from '@app/models';
import { Action, createReducer, on } from '@ngrx/store';
import * as featureActions from './resources.actions';

export interface ResourcesState {
  surahs: string[];
  moshafs: string[];
  errors: IQlError;
  calledRessources: ICalledRessources;
}

export const initialResourcesState: ResourcesState = {
  surahs: ['Al-Fatiha', 'Al-Baqarah', 'Al-Imran', 'An-Nisa'],
  moshafs: ['Warsh', 'Hafs'],
  errors: null,
  calledRessources: new CalledRessources(),
};

const featureReducer = createReducer(
  initialResourcesState,
  on(
    featureActions.GetSurahsSuccess,
    featureActions.GetMushafsSuccess,
    featureActions.GetMushafsError,
    featureActions.GetSurahsError,
    (state, action) => ({ ...state, ...action })
  ),
  on(featureActions.SetCalledRessources, (state, action) => ({
    ...state,
    calledRessources: {
      ...state.calledRessources,
      [action.ressource]: action.value,
    },
  }))
);

export function resourcesReducer(
  state: ResourcesState | undefined,
  action: Action
): ResourcesState {
  return featureReducer(state, action);
}
