import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    const passwordRegex = /^(?=.*[A-z])(?=.*\d)[A-z\d]+$/;

    if (passwordRegex.test(password)) {
      return null;
    }

    return {error: 'Validation failed'};
  }
}
