import { FormControl, Validators } from '@angular/forms';
import { Appreciation } from './../../../shared/enums/appreciation.enum';
import { IRecitationDetail, RecitationDetail } from './recitation-detail.model';

export interface IRecitationDetailFormGroup {
  page: FormControl<number>;
  sourat: FormControl<string>;
  appreciation: FormControl<Appreciation>;
  observation: FormControl<string>;
}

export class RecitationDetailFormGroup implements IRecitationDetailFormGroup {
  page: FormControl<number>;
  sourat: FormControl<string>;
  appreciation: FormControl<Appreciation>;
  observation: FormControl<string>;

  constructor(recitation: IRecitationDetail = new RecitationDetail()) {
    this.page = new FormControl<number>(recitation.page, Validators.required);
    this.sourat = new FormControl<string>(
      recitation.sourat,
      Validators.required
    );
    this.appreciation = new FormControl<Appreciation>(
      recitation.appreciation,
      Validators.required
    );
    this.observation = new FormControl<string>(recitation.observation);
  }
}
