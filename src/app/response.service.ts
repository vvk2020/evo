import { Injectable } from '@angular/core';
import { Data } from './interfaces/data';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  private _data: Data[] = [
    {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false,
    },
  ];

  public get data(): ReadonlyArray<Data> {
    return [...this._data];
  }
}
