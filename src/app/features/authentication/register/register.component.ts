import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { IUser } from '@app/models';
import { Store } from '@ngrx/store';
import { Register } from 'app/core/store/auth/auth.actions';
import * as moment from 'moment';
import {
  IRegisterContactFormGroup,
  IRegisterPageFormGroup,
  IRegisterPersonalFormGroup,
  RegisterPageFormGroup,
} from './models';
import { RegisterContactComponent } from './register-contact/register-contact.component';
import { RegisterPagesComponent } from './register-pages/register-pages.component';
import { RegisterPersonalComponent } from './register-personal/register-personal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    RouterLink,
    RegisterContactComponent,
    RegisterPersonalComponent,
    RegisterPagesComponent,
  ],
})
export class RegisterComponent {
  private store: Store = inject(Store);

  public contactFormGroup: FormGroup<IRegisterContactFormGroup> =
    new FormGroup<IRegisterContactFormGroup>({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      pseudo: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });

  public personalFormGroup: FormGroup<IRegisterPersonalFormGroup> =
    new FormGroup<IRegisterPersonalFormGroup>({
      firstname: new FormControl<string>('', Validators.required),
      lastname: new FormControl<string>('', Validators.required),
      birthdate: new FormControl<string>('', Validators.required),
    });

  public pagesFormGroup: FormArray<FormGroup<IRegisterPageFormGroup>> =
    new FormArray([
      new FormGroup<IRegisterPageFormGroup>(new RegisterPageFormGroup()),
    ]);

  /**
   * Récupération de du register et mot de passe et authentification de l'utilisateur
   */
  public onSubmit(): void {
    const request: IUser = {
      ...this.contactFormGroup.getRawValue(),
      ...this.personalFormGroup.getRawValue(),
      birthdate: moment(this.personalFormGroup.getRawValue().birthdate).format(
        'YYYY-MM-DD'
      ),
      // ...this.pagesFormGroup.getRawValue(),
    };
    this.store.dispatch(Register({ request }));
  }
}
