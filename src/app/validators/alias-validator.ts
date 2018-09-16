import { of as observableOf } from 'rxjs';

import { map } from 'rxjs/operators';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { DataService } from '@exam-core/data.service';
import { EventService } from '@exam-core/event.service';

export function aliasValidator(dataService: DataService, eventService: EventService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const alias = control.value;

    if (control.invalid) {
      return observableOf(null);
    }

    return dataService.isAliasExist$(alias).pipe(
      map(count => {
        return !count ? null : {aliasTaken: true}; // if alias don't exist, count === 0
      }));
  };
}
