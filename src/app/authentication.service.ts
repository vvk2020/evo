import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// const BASE_URL: string = 'https://evo-academy.wckz.dev/api/cooking-blog/';
const BASE_URL: string = '/api/';

export interface Account {
  id: string; // "fb80c837-a44f-4e43-ac01-fcdc8a117200",
  role: string; //"admin",
  firstName: string; //"Petr",
  lastName?: string; // 'Petrov';
  middleName?: string; // 'Petrovich';
  avatar?: string; // 'https://avatars.githubusercontent.com/u/47239541';
  username?: string; // 'admin';
  jwtToken: string; // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiODBjODM3LWE0NGYtNGU0My1hYzAxLWZjZGM4YTExNzIwMCIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3NDYwOTg4MTUsImV4cCI6MTc0NjEwMjQxNX0.g4YxA98cwySzvv7tJrxXvOwwuVl-Lfs1FE_oXel51qA';
  expiresIn?: number;
}

export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _account?: Account;

  constructor(private http: HttpClient) {}

  public logining(user: User) {
    if (user.username && user.password) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Accept': '*/*',
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
    return this._account;
  }

  public set account(accnt: Account | undefined) {
    if (this.isAccount(accnt)) {
      this._account = accnt;
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
}
