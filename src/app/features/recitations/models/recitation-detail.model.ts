import { Appreciation } from '@app/enums';

export interface IRecitationDetail {
  page: number;
  sourat: string;
  appreciation: Appreciation;
  observation: string;
}

export class RecitationDetail implements IRecitationDetail {
  constructor(
    public page: number = null,
    public sourat: string = null,
    public appreciation: Appreciation = null,
    public observation: string = null
  ) {}
}
