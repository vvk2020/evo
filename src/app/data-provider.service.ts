import {
  HttpClient,
  HttpContext,
  HttpHeaders,
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
    context?: HttpContext;
    observe?: 'body';
    params?: { [param: string]: string | number | boolean };
    reportProgress?: boolean;
    // responseType: 'arraybuffer' | 'blob' | 'text' | 'json' | undefined;
    // responseType?: "json";
    responseType?: 'json' | 'text';
    withCredentials?: boolean;
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

  getPostByIdAsJSON(
    reqConf: RequestConfig = {},
    postId?: number
  ): Observable<Post> {
    let postsURL = reqConf.url || POSTS_URL;
    if (postId) postsURL += `/${postId}`;
    return this.http.get<Post>(postsURL, {
      ...reqConf.options,
      responseType: 'json' as const,
    });
  }

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
