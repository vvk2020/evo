import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

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

  selectedOption: number = this.options[0].value; // admin выбран по умолчанию

  constructor() {

  }

  fontStyleControl = new FormControl('bold');
  fontStyle?: string;

  onOptionChange() {
    console.log('Selected option:', this.selectedOption);
    // Ваша логика при изменении выбора
  }
}
