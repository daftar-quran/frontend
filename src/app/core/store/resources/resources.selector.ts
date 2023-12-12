import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResourcesState } from './resources.reducer';

export const selectResources =
  createFeatureSelector<ResourcesState>('resources');
export const selectMoshafs = createSelector(
  selectResources,
  (state: ResourcesState) => state.moshafs
);
export const selectSurahs = createSelector(
  selectResources,
  (state: ResourcesState) => state.surahs
);

export const selectCalledRessources = createSelector(
  selectResources,
  (state: ResourcesState) => state.calledRessources
);
