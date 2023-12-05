import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResourcesState } from './resources.reducer';

export const SelectResources =
  createFeatureSelector<ResourcesState>('resources');
export const SelectMoshafs = createSelector(
  SelectResources,
  (state: ResourcesState) => state.moshafs
);
export const SelectSurahs = createSelector(
  SelectResources,
  (state: ResourcesState) => state.surahs
);

export const SelectCalledRessources = createSelector(
  SelectResources,
  (state: ResourcesState) => state.calledRessources
);
