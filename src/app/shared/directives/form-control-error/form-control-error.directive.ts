import { Directive, HostBinding, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appFormControlError]',
  standalone: true,
})
export class FormControlErrorDirective {
  @Input() pattern: string = null;
  @Input() field: string = null;
  @Input() set errors(value: ValidationErrors) {
    this.errorMessage = this.getErrorMessage(value, this.pattern, this.field);
  }
  @HostBinding('innerText') errorMessage: string;

  /**
   * This method generates list of error message based on the errors object
   * Errors must be ordered by priority
   * @param errors ValidationErrors
   * @param pattern to show on the specific pattern error message
   * @param field field name to display in error message
   * @returns
   */
  private getErrorMessage(
    errors: ValidationErrors,
    pattern: string,
    field: string
  ): string {
    if (!errors) return '';

    if (errors.required) {
      const fieldName = field ?? 'Champs';
      return `${fieldName} obligatoire`;
    }
  }
}
