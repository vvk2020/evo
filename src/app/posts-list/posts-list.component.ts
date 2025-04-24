import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post, PostsService } from '../posts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  private _getPosts$?: Subscription; // подписка на посты
  // public isGetPostsExec: boolean = false; // флаг выполнения запроса постов
  private _posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  public getAllPosts(): void {
    this._getPosts$?.unsubscribe(); // отписка от предыдущей подписки
    this._getPosts$ = this.postsService.getPosts().subscribe({
      next: (posts) => {
        this._posts = [...posts]; // сохранение данных, вывод данных в консоль
        // Вывод данных в консоль
        console.clear();
        console.log('Выбранные посты:', posts);
      },
      error: (err: HttpErrorResponse) => {
        // Вывод кастомной ошибки в консоль
        console.clear();
        console.error(`Ошибка ${err.status}:`, err.message);
      },
    });
  }

  ngOnDestroy() {
    this._getPosts$?.unsubscribe();
  }
}
