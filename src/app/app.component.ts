import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccountService, Role } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public accountService: AccountService) {}

  accountRole = new FormControl(this.accountService.role); // admin выбран по умолчанию

  ngOnInit() {
    // Подписываемся на изменения роли
    this.accountRole.valueChanges.subscribe((role) => {
      this.handleToggleRole(role);
    });
  }

  // ОБработка зменения роли в <mat-button-toggle-group>
  handleToggleRole(role: string | null) {
    if (role) this.accountService.role = role as Role;
  }
}
