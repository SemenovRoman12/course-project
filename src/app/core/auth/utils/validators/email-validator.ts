import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;

    const emailRegex = /^[A-z][a-zA-Z0-9]*@[A-z][a-zA-Z0-9]*\.[a-zA-Z]+$/;

    if (emailRegex.test(email)) {
      return null;
    }

    return {error: 'Validation failed'};
  }
}
