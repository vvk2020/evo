import { Pipe, PipeTransform } from '@angular/core';

/* Pipe увеличения входного значения числа на 5 */

@Pipe({
  name: 'add5',
})
export class Add5Pipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (typeof value === 'number') return value + 5;
    return null;
  }
}
