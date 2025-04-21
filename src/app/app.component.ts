import { Component, OnDestroy } from '@angular/core';
import {
  DataProviderService,
  Post,
  PostComment,
  RequestConfig,
} from './data-provider.service';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  // Подписки
  private _getPosts$?: Subscription;
  private _getPostCommentsById$?: Subscription;
  private _createPost$?: Subscription;
  private _getDelPostById$?: Subscription;

  // Данные, полученные из запроса
  private _posts: Post[] = [];
  private _selectedPost?: Post;
  private _postComments: PostComment[] = [];
  private _post?: Post;
  private _textPost: string = '';
  // Флаги блокировок кнопок (предотвращение множественных запросов)
  public isGetPostsExec: boolean = false;
  public isGetPostCommentsExec: boolean = false;
  public isPosting: boolean = false;
  public isDelPostExec: boolean = false;
  // Пути
  public ERROR_POSTS_URL: string = 'https://jsonplaceholder.typicode.com/post';

  constructor(private _provider: DataProviderService) {}

  // Кнопка 1, 4: GET-запрос постов (c кастомной обработкой ошибок)
  public getAllPosts<T = Post[] | Post | string>(
    request: Observable<T>,
    successCallback: (posts: T) => void
  ): void {
    this._getPosts$?.unsubscribe(); // отписка от предыдущей подписки
    this.isGetPostsExec = true; // блокировка кнопок
    this._getPosts$ = request.subscribe({
      next: (data) => {
        this.isGetPostsExec = false; // разблокировка кнопки запроса
        successCallback(data); // сохранение данных, вывод данных в консоль
        // Вывод данных в консоль
        console.clear();
        console.log('Выбранные посты:', data);
      },
      error: (err: HttpErrorResponse) => {
        this.isGetPostsExec = false; // разблокировка кнопок запроса
        // Вывод кастомной ошибки в консоль
        console.clear();
        console.error(`Ошибка ${err.status}:`, err.message);
      },
    });
  }

  public getAllPostsToJson(postsReqConf?: RequestConfig): void {
    this.getAllPosts<Post[]>(
      this._provider.getPostsAsJSON(postsReqConf),
      (posts) => (this._posts = [...posts])
    );
  }

  // Кнопка 5: GET-запрос постов (c расширенной обработкой ошибок)
  public getAllPostsToText(postsReqConf?: RequestConfig): void {
    const reqConf: RequestConfig = {
      ...postsReqConf,
      options: {
        headers: {
          'X-Test': '1',
        },
      },
    };
    this.getAllPosts<string>(
      this._provider.getPostsAsText(reqConf),
      (posts) => (this._textPost = posts)
    );
  }

  // Кнопка 2: GET-запрос комментариев к выбранному посту (postId=1)
  public getAllPostCommentsById(postId: number = 1): void {
    this._getPostCommentsById$?.unsubscribe(); // отписка от предыдущей подписки
    this.isGetPostCommentsExec = true; // блокировка кнопки запроса
    this._getPostCommentsById$ = this._provider
      .getPostCommentsById(postId)
      .subscribe({
        next: (resp) => {
          this._postComments = [...resp]; // сохранение данных в компоненте
          this.isGetPostCommentsExec = false; // разблокировка кнопки запроса
          // Вывод данных в консоль
          console.clear();
          console.log(
            `Комментарии к посту с postId = ${postId}:`,
            this._postComments
          );
        },
        error: (err) => {
          this.isGetPostCommentsExec = false; // разблокировка кнопки запроса
          // Вывод ошибки в консоль
          console.clear();
          console.error('Ошибка:', err);
        },
      });
  }

  // Кнопка 3: POST-запрос c отправкой пустого объекта
  public createNewPost(post: Partial<Post> = {}): void {
    this._createPost$?.unsubscribe(); // отписка от предыдущей подписки
    this.isPosting = true; // блокировка кнопки запроса
    this._createPost$ = this._provider.createPost(post).subscribe({
      next: (resp) => {
        console.clear();
        if (!resp) {
          console.error('Ошибка: получен пустой ответ');
          return;
        }
        this._post = resp; // сохранение данных в компоненте
        this.isPosting = false; // разблокировка кнопки запроса
        console.log('Cоздан пост:', this._post); // вывод в консоль
      },
      error: (err) => {
        this.isPosting = false; // разблокировка кнопки запроса
        // Вывод ошибки в консоль
        console.clear();
        console.error('Ошибка:', err);
      },
    });
  }

  // Кнопка 6: DELETE-запрос выбранного (1) поста
  public deletePostById(postId: number = 1): void {
    this._getDelPostById$?.unsubscribe(); // отписка от предыдущей подписки
    this.isDelPostExec = true; // блокировка кнопки запроса
    this._getDelPostById$ = this._provider.deletePostById(postId).subscribe({
      next: (resp) => {
        this.isDelPostExec = false; // разблокировка кнопки запроса
        // Вывод данных в консоль
        console.clear();
        console.log('Ответ сервера:', resp);
      },
      error: (err) => {
        this.isDelPostExec = false; // разблокировка кнопки запроса
        // Вывод ошибки в консоль
        console.clear();
        console.error('Ошибка:', err);
      },
    });
  }

  getPostByIdToJson(postId: number, postsReqConf?: RequestConfig): void {
    this.getAllPosts<Post>(
      this._provider.getPostByIdAsJSON(postsReqConf, postId),
      (post) => (this._selectedPost = post)
    );
  }

  // Кнопка 7: GET-запрос поста по postId
  ngOnDestroy() {
    this._getPosts$?.unsubscribe();
    this._getPostCommentsById$?.unsubscribe();
    this._createPost$?.unsubscribe();
    this._getDelPostById$?.unsubscribe();
  }
}
