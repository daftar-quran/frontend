import { FormControl } from '@angular/forms';

export interface IRegisterContactFormGroup {
  email: FormControl<string>;
  userName: FormControl<string>;
  password: FormControl<string>;
}
