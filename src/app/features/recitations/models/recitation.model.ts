import { IRecitationDetail, RecitationDetail } from './recitation-detail.model';

export interface IRecitation {
  studentId: number;
  profId: number;
  date: string;
  details: IRecitationDetail[];
}

export class Recitation implements IRecitation {
  constructor(
    public studentId: number = null,
    public profId: number = null,
    public date: string = null,
    public details: IRecitationDetail[] = [new RecitationDetail()]
  ) {}
}
