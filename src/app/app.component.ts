import { Component, OnDestroy } from '@angular/core';
import {
  DataProviderService,
  Post,
  PostComment,
} from './data-provider.service';
import { Subscription } from 'rxjs';

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
  // Данные, полученные из запроса
  private _posts: Post[] = [];
  private _postComments: PostComment[] = [];
  private _post?: Post;
  // Флаги блокировок кнопок (предотвращение множественных запросов)
  public isGetPostsExec: boolean = false;
  public isGetPostCommentsExec: boolean = false;
  public isPosting: boolean = false;

  constructor(private _provider: DataProviderService) {}

  // Кнопка 1: GET-запрос постов
  public getAllPosts() {
    this._getPosts$?.unsubscribe(); // отписка от предыдущей подписки
    this.isGetPostsExec = true; // блокировка кнопки запроса
    this._getPosts$ = this._provider.getPosts().subscribe({
      next: (resp) => {
        this._posts = [...resp]; // сохранение данных в компоненте
        this.isGetPostsExec = false; // разблокировка кнопки запроса
        // Вывод данных в консоль
        console.clear();
        console.log('Посты:', this._posts);
      },
      error: (err) => {
        this.isGetPostsExec = false; // разблокировка кнопки запроса
        // Вывод ошибки в консоль
        console.clear();
        console.error('Ошибка:', err);
      },
    });
  }

  // Кнопка 2: GET-запрос комментариев к посту с заданнм (1) postId
  public getAllPostCommentsById(postId: number = 1) {
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
  public createPost(post: Partial<Post> = {}) {
    this._createPost$?.unsubscribe(); // отписка от предыдущей подписки
    this.isPosting = true; // блокировка кнопки запроса
    this._createPost$ = this._provider.postPost(post).subscribe({
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

  ngOnDestroy() {
    this._getPosts$?.unsubscribe();
    this._getPostCommentsById$?.unsubscribe();
    this._createPost$?.unsubscribe();
  }
}
