import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  accountsTypes = [
    {
      id: 7,
      role: 'admin',
    },
    {
      id: 3,
      role: 'user',
    },
  ];

  accountName = new FormControl(this.accountsTypes[0].role); // admin выбран по умолчанию
  // accountChange$: Subscription;

  ngOnInit() {
    // Подписываемся на изменения значения
    this.accountName.valueChanges.subscribe((value) => {
      this.handleToggleRole(value);
    });
  }

  handleToggleRole(selectedValue: string | null) {
    switch (selectedValue) {
      case this.accountsTypes[0].role:
        console.log(this.accountsTypes[0].role);
        break;
      case this.accountsTypes[1].role:
        console.log(this.accountsTypes[0].role);
        break;
      default:
    }
    // if (selectedValue === this.accounts[0].role) {
    //   console.log(this.accounts[0].role);
    // } else if (selectedValue === this.accounts[1].role) {
    //   console.log(this.accounts[1].role);
    // }
  }
}
