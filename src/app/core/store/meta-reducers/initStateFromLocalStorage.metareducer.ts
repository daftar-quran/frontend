import { Action, ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState } from '../app.state';
import { LOCAL_STORAGE_KEYS } from '@app/config';
import { LocalStorageGetItem } from '../../storage/localStorage.helper';

export function initStateFromLocalStorage(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state: AppState | undefined, action: Action) => {
    let newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      newState = {
        ...newState,
        auth: {
          ...newState.auth,
          ...LocalStorageGetItem(LOCAL_STORAGE_KEYS.auth),
        },
      };
    }
    return newState;
  };
}
