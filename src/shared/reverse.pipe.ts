import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: string) {
    // split the string into an array of charaters, reverse them and join htem again with no white space
    return value.split('').reverse().join('');
  }
}
