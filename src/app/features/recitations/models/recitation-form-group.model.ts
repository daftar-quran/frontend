import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IRecitationDetailFormGroup,
  RecitationDetailFormGroup,
} from './recitation-detail-form-group.model';
import { IRecitationDetail } from './recitation-detail.model';
import { IRecitation, Recitation } from './recitation.model';

export interface IRecitationFormGroup {
  studentId: FormControl<number>;
  profId: FormControl<number>;
  date: FormControl<string>;
  details: FormArray<FormGroup<IRecitationDetailFormGroup>>;
}

export class RecitationFormGroup implements IRecitationFormGroup {
  studentId: FormControl<number>;
  profId: FormControl<number>;
  date: FormControl<string>;
  details: FormArray<FormGroup<IRecitationDetailFormGroup>>;

  constructor(recitation: IRecitation = new Recitation()) {
    this.studentId = new FormControl(recitation.studentId, Validators.required);
    this.profId = new FormControl(recitation.profId, Validators.required);
    this.date = new FormControl(recitation.date, Validators.required);
    this.details = new FormArray([], Validators.required);

    recitation.details.forEach((rec: IRecitationDetail) =>
      this.details.push(
        new FormGroup<IRecitationDetailFormGroup>(
          new RecitationDetailFormGroup(rec)
        )
      )
    );
  }
}
