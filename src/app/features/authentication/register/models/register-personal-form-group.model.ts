import { FormControl } from '@angular/forms';

export interface IRegisterPersonalFormGroup {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  city: FormControl<string>;
  birthDate: FormControl<string>;
}
