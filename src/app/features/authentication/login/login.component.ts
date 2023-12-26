import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ILogin } from '../../../core/auth/models';
import { Login } from '../../../core/store/auth/auth.actions';
import { ILoginFormGroupModel } from './models/login-form-group.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
export class LoginComponent implements OnInit {
  private store: Store = inject(Store);

  public form: FormGroup<ILoginFormGroupModel>;

  ngOnInit(): void {
    // reset Auth Error
    //  this.store.dispatch(ResetError());
    this.form = new FormGroup<ILoginFormGroupModel>({
      USERNAME: new FormControl<string>('', Validators.required),
      PASSWORD: new FormControl<string>('', Validators.required),
    });
  }
  /**
   * Récupération de du login et mot de passe et authentification de l'utilisateur
   */
  public onSubmit(): void {
    const request: ILogin = this.form.getRawValue();
    this.store.dispatch(Login({ request }));
  }
}
