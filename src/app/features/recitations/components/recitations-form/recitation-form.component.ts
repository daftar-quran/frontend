import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControlErrorDirective } from '@app/directives';
import { Appreciation } from '@app/enums';
import {
  IRecitationFormGroup,
  RecitationFormGroup,
} from 'app/features/recitations/models/recitation-form-group.model';

import { MatDividerModule } from '@angular/material/divider';
import {
  IRecitationDetailFormGroup,
  RecitationDetailFormGroup,
} from '../../models';
import { RecitationsStore } from '../../recitations.store';

@Component({
  selector: 'app-recitation-form',
  templateUrl: 'recitation-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatDividerModule,
    FormControlErrorDirective,
  ],
})
export class RecitationFormComponent {
  private fb = inject(FormBuilder);
  private recitationsStore = inject(RecitationsStore);

  public form: FormGroup<IRecitationFormGroup> = this.fb.group(
    new RecitationFormGroup()
  );

  public readonly appreciation = Appreciation;

  public saveRecitation(): void {
    this.recitationsStore.addRecitation(this.form.getRawValue());
  }

  public addNewRow(): void {
    this.form.controls.details.push(
      new FormGroup<IRecitationDetailFormGroup>(new RecitationDetailFormGroup())
    );
  }

  public deleteRow(index: number): void {
    this.form.controls.details.removeAt(index);
  }
}
