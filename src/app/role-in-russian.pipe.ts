import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleInRussian',
})
export class RoleInRussianPipe implements PipeTransform {
  transform(value: unknown): string {
    if (typeof value === 'string') {
      console.log('value:', value);
      switch (value) {
        case 'admin':
          return 'Администратор';
        case 'user':
          return 'Пользователь';
        default:
          return 'Роль неизвестна';
      }
    }
    return '';
  }
}
