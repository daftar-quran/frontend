import { FormControl } from '@angular/forms';

export interface IRegisterPersonalFormGroup {
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  birthdate: FormControl<string>;
}
