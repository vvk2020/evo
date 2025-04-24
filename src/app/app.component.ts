import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options = [
    {
      value: 7,
      label: 'admin',
    },
    {
      value: 3,
      label: 'user',
    },
  ];

  accountName = new FormControl(this.options[0].label); // admin выбран по умолчанию
  // accountChange$: Subscription;

  ngOnInit() {
    // Подписываемся на изменения значения
    this.accountName.valueChanges.subscribe((value) => {
      this.handleToggleRole(value);
    });
  }

  handleToggleRole(selectedValue: string | null) {
    if (selectedValue === 'user') {
      console.log('Выбран режим пользователя');
      // Действия для режима пользователя
    } else if (selectedValue === 'admin') {
      console.log('Выбран режим администратора');
      // Действия для режима администратора
    }
  }
}
