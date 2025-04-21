import {
  HttpClient,
  HttpContext,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

export interface RequestConfig {
  url?: string;
  options?: {
    headers?: { [header: string]: string | string[] };
    params?: { [param: string]: string | number | boolean };
    responseType?: 'json' | 'text'; // 'arraybuffer' | 'blob' | undefined;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  constructor(private http: HttpClient) {}

  // GET-запрос поста с заданным postId
  getPostCommentsById(postId: number) {
    const params = new HttpParams().set('postId', postId);
    return this.http.get<PostComment[]>(COMMENTS_URL, { params });
  }

  // POST-запрос поста с заданным Post
  createPost(post: Partial<Post> = {}) {
    return this.http.post<Post>(POSTS_URL, post);
  }

  // GET-запрос постов в выводом в JSON-формате
  getPostsAsJSON(reqConf: RequestConfig = {}): Observable<Post[]> {
    let postsURL = reqConf.url || POSTS_URL;
    return this.http.get<Post[]>(postsURL, {
      ...reqConf.options,
      responseType: 'json' as const,
    });
  }

  // GET-запрос поста с заданным postId и вывод в JSON-формате
  getPostByIdAsJSON(
    reqConf: RequestConfig = {},
    postId?: number
  ): Observable<Post> {
    let postsURL = reqConf.url || POSTS_URL;
    if (postId) postsURL += `/${postId}`;
    console.clear();
    return this.http.get<Post>(postsURL, {
      ...reqConf.options,
      responseType: 'json' as const,
    });
  }

  // GET-запрос постов с выводом в текстовом формате
  getPostsAsText(reqConf: RequestConfig = {}): Observable<string> {
    const postsURL = reqConf.url || POSTS_URL;
    return this.http.get(postsURL, {
      ...reqConf.options,
      // headers: {
      //   'X-Test': '1',
      // },
      responseType: 'text' as const,
    });
  }

  // DELETE-запрос поста с заданным id
  deletePostById(id: number) {
    return this.http.delete<void>(`${COMMENTS_URL}/${id}`);
  }
}
