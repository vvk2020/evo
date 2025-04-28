import { Component } from '@angular/core';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: false,
})
export class TableComponent {
  displayedColumns: string[] = ['id', 'name'];
  users = [
    { id: 1, name: 'Сплин' },
    { id: 2, name: 'Кино' },
    { id: 3, name: 'Машина времени' },
    { id: 4, name: 'Би-2' },
    { id: 5, name: 'ДДТ' },
    { id: 6, name: 'Аквариум' },
    { id: 7, name: 'Nautilus Pompilius' },
    { id: 8, name: 'Ночные снайперы' },
    { id: 9, name: 'Пикник' },
    { id: 10, name: 'Чайф' },
  ];

  data = new MatTableDataSource(this.users);
}
