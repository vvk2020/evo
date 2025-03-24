import { Pipe, PipeTransform } from '@angular/core';

/* Pipe трансформации текствого формата даты YYYY-MM-DD в формат DD/MM/YYYY */

@Pipe({
  name: 'transformDate',
})
export class TransformDatePipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (typeof value === 'string') {
      const regexp = /(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})/;
      if (regexp.test(value)) {
        const res = value.match(regexp);
        if (res) {
          return res[0].replace(regexp, '$<day>/$<month>/$<year>');
        }
      }
    }
    return '';
  }
}
