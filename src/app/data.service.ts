import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getToDos() {
    return this.http.get(TODOS_URL);
  }
}
