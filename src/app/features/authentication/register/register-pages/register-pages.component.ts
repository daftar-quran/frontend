import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { IRegisterPageFormGroup, RegisterPageFormGroup } from '../models';

@Component({
  selector: 'app-register-pages',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatDatepickerModule,
  ],
  templateUrl: './register-pages.component.html',
})
export class RegisterPagesComponent {
  @Input({ required: true }) form: FormArray<FormGroup<IRegisterPageFormGroup>>;
  @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();

  public addNewRow(): void {
    this.form.push(
      new FormGroup<IRegisterPageFormGroup>(new RegisterPageFormGroup())
    );
  }

  public deleteRow(index: number): void {
    this.form.removeAt(index);
  }
}
