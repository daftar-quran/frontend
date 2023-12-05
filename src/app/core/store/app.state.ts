import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { initStateFromLocalStorage } from './meta-reducers/initStateFromLocalStorage.metareducer';
import {
  resourcesReducer,
  ResourcesState,
} from './resources/resources.reducer';

export interface AppState {
  resources: ResourcesState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  resources: resourcesReducer,
  auth: authReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage,
];
