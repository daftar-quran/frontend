import { FormControl } from '@angular/forms';

export interface IRegisterContactFormGroup {
  email: FormControl<string>;
  pseudo: FormControl<string>;
  password: FormControl<string>;
}
