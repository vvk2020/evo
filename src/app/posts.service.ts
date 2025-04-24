import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const POSTS_URL: string = 'https://jsonplaceholder.typicode.com/posts';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  // GET-запрос постов в выводом в JSON-формате
  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(POSTS_URL);
  }
}
