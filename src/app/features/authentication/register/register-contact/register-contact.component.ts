import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { IRegisterContactFormGroup } from '../models';

@Component({
  selector: 'app-register-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
  ],
  templateUrl: './register-contact.component.html',
})
export class RegisterContactComponent {
  @Input({ required: true }) form: FormGroup<IRegisterContactFormGroup>;
}
