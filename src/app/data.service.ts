import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  role: 'user' | 'admin' = 'admin';

  constructor() { }
}
