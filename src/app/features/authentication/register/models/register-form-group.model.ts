import { FormControl } from '@angular/forms';

export interface IRegisterFormGroupModel {
  email: FormControl<string>;
  userName: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  password: FormControl<string>;
}
