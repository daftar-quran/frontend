import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { IRegisterRequest } from '@app/models';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { IRegisterFormGroupModel } from './models/register-form-group.model';

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
    MatCheckboxModule,
    RouterLink,
  ],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup<IRegisterFormGroupModel>;

  ngOnInit(): void {
    // reset Auth Error
    //  this.store.dispatch(ResetError());
    this.form = new FormGroup<IRegisterFormGroupModel>({
      email: new FormControl<string>('', Validators.required),
      userName: new FormControl<string>('', Validators.required),
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }
  /**
   * Récupération de du register et mot de passe et authentification de l'utilisateur
   */
  public onSubmit(): void {
    const request: IRegisterRequest = this.form.getRawValue();
    console.log(request);
    //   this.store.dispatch(Register({ request }));
  }
}
