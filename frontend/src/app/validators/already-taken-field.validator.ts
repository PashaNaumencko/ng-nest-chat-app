import { FormControl } from '@angular/forms';
import { map, switchMap, finalize } from 'rxjs/operators';
import { timer } from 'rxjs';
import { Observable } from 'rxjs';
import { IValidateResponse } from '../modules/auth/models/IValidateResponse';

export function AlreadyTaken(
  field: string,
  validateFunction: (field: string, value: string) => Observable<IValidateResponse>
) {
  return (formControl: FormControl) => {
    return timer(1000).pipe(
      switchMap(() => validateFunction(field, formControl.value)),
      map((response) => {
        return response.isAvailable ? null : { [`${field}AlreadyTaken`]: true };
      })
    );
  };
}
