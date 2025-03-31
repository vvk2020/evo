import { Injectable } from '@angular/core';

export interface Post {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _Data: Post = {} as Post;

  constructor() {}

  public set Data(inData: Post) {
    this._Data = this.deepCopy(inData);
  }

  public get Data(): Post {
    return this._Data;
  }

  // Метод глубокого копирования объекта
  private deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
