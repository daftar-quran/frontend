import { createAction, props } from '@ngrx/store';
import { IQlError } from '@app/models';

export const GetSurahs = createAction('[ Resources ] - Get Surahs');
export const GetSurahsSuccess = createAction(
  '[ Resources ] - Get Surahs Success',
  props<{ surahs: string[] }>()
);
export const GetSurahsError = createAction(
  '[ Resources ] - Get Surahs Error',
  props<{ surahs?: string[]; error: IQlError }>()
);

export const GetMushafs = createAction('[ Resources ] - Get Mushafs');
export const GetMushafsSuccess = createAction(
  '[ Resources ] - Get Mushafs Success',
  props<{ mushafs: string[] }>()
);
export const GetMushafsError = createAction(
  '[ Resources ] - Get Mushafs Error',
  props<{ mushafs?: string[]; error: IQlError }>()
);
export const SetCalledRessources = createAction(
  '[ Resources ] - SetCalledRessources',
  props<{ ressource: string; value: boolean }>()
);
