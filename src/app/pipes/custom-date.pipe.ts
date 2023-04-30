import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: number): string {
    const date = new Date(value);
    // return the date as mmddyy
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

}
