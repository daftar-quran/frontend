import { Appreciation } from '@app/enums';

export interface IConsolidation {
  id?: number;
  page: number;
  date: string;
  sura: string;
  chaikh: string;
  appreciation: Appreciation;
  observation: string;
  tikrar: number;
}
