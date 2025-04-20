import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const POSTS_URL: string = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL: string = 'https://jsonplaceholder.typicode.com/comments';

// Интерфейс поста
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Интерфейс комментария к посту
export interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  constructor(private http: HttpClient) {}

  // GET-запрос массива постов
  getPosts(url: string = POSTS_URL) {
    return this.http.get<Post[]>(url);
  }

  // GET-запрос поста с заданным postId
  getPostCommentsById(postId: number) {
    const params = new HttpParams().set('postId', postId);
    return this.http.get<PostComment[]>(COMMENTS_URL, { params });
  }

  // POST-запрос поста с заданным postId
  createPost(post: Partial<Post> = {}) {
    return this.http.post<Post>(POSTS_URL, post);
  }
}
