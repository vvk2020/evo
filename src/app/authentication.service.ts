import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account, User } from './interaces/auth.interface';

// const BASE_URL: string = 'https://evo-academy.wckz.dev/api/cooking-blog/';
const BASE_URL: string = '/api/';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _account$ = new BehaviorSubject<Account | undefined>(undefined);

  constructor(private http: HttpClient) {}

  public logining(user: User) {
    if (user.username && user.password) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.post<Account>(
        `${BASE_URL}users/sign`,
        {
          username: user.username,
          password: user.password,
        },
        { headers }
      );
    }
    return;
  }

  public get account(): Account | undefined {
    return this._account$.getValue();
  }

  public set account(accnt: Account | undefined) {
    if (this.isAccount(accnt)) {
      // Если аватар не задан, то использется по умолчанию
      if (!accnt.avatar)
        accnt.avatar = '../assets/images/unknown-user-avatar.webp';
      this._account$.next(accnt);
    }
  }

  // guard для Account
  private isAccount(obj: any): obj is Account {
    return (
      obj &&
      typeof obj.id === 'string' &&
      typeof obj.role === 'string' &&
      typeof obj.firstName === 'string' &&
      typeof obj.jwtToken === 'string'
    );
  }

  // Метод для подписки на изменения
  public onAccountChange(): Observable<Account | undefined> {
    return this._account$.asObservable();
  }

  // Выход пользователя из системы
  public logout() {
    this._account$.next(undefined);
  }
}
