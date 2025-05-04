import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Subscription } from 'rxjs';
import { Account } from './interaces/auth.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private _accountSubscr!: Subscription;
  public currentAccount?: Account;

  constructor(private _authServ: AuthenticationService) {}
  ngOnInit(): void {
    console.log('currentAccount:', this.currentAccount);
    // Подписываемся на изменения аккаунта
    this._accountSubscr = this._authServ
      .onAccountChange()
      .subscribe((account) => {
        this.currentAccount = account;
      });
    // Инициализация
    this.currentAccount = this._authServ.account;
  }

  ngOnDestroy() {
    // Отписка при уничтожении компонента
    this._accountSubscr?.unsubscribe();
  }

  onLogout(){
    this._authServ.logout();
  }
}
