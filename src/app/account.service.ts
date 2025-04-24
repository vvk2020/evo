import { Injectable } from '@angular/core';

export type Role = 'user' | 'admin';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _role: Role = 'admin';

  constructor() {}

  get role() {
    return this._role;
  }

  set role(role: Role) {
    if (role) this._role = role;
  }
}
