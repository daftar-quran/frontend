import { FormControl, Validators } from '@angular/forms';

export interface IRegisterPageFormGroup {
  from: FormControl<number>;
  to: FormControl<number>;
}

export class RegisterPageFormGroup implements IRegisterPageFormGroup {
  from: FormControl<number>;
  to: FormControl<number>;

  constructor() {
    this.from = new FormControl<number>(null, Validators.required);
    this.to = new FormControl<number>(null, Validators.required);
  }
}
