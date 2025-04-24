import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  accountsRoles = [
    {
      id: 7,
      role: 'admin',
    },
    {
      id: 3,
      role: 'user',
    },
  ];

  accountRole = new FormControl(this.accountsRoles[0].role); // admin выбран по умолчанию
  // accountChange$: Subscription;

  ngOnInit() {
    // Подписываемся на изменения роли
    this.accountRole.valueChanges.subscribe((value) => {
      this.handleToggleRole(value);
    });
  }


  // ОБработка зменения роли в <mat-button-toggle-group>
  handleToggleRole(selectedValue: string | null) {
    switch (selectedValue) {
      case this.accountsRoles[0].role:
        console.log(this.accountsRoles[0].role);
        break;
      case this.accountsRoles[1].role:
        console.log(this.accountsRoles[0].role);
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
