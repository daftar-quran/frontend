import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IRegisterPersonalFormGroup } from '../models';

@Component({
  selector: 'app-register-personal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatDatepickerModule,
  ],
  templateUrl: './register-personal.component.html',
})
export class RegisterPersonalComponent {
  @Input({ required: true }) form: FormGroup<IRegisterPersonalFormGroup>;
}
