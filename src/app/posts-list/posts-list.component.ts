import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post, PostsService } from '../posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  private _getPosts$?: Subscription; // подписка на посты
  private _posts: Post[] = [];

  public isLoading = false; // флаг выполнения запроса постов
  public displayedColumns: string[] = ['id', 'title', 'actions'];
  public dataSource!: MatTableDataSource<Post>;

  constructor(private _postsService: PostsService, private _router: Router) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  public getAllPosts(): void {
    this.isLoading = true;
    this._getPosts$?.unsubscribe(); // отписка от предыдущей подписки
    this._getPosts$ = this._postsService.getPosts().subscribe({
      next: (posts) => {
        this._posts = [...posts];
        this.dataSource = new MatTableDataSource(posts);
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this._posts = [];
        this.isLoading = false;
        // Вывод ошибки в консоль
        console.error(`Ошибка ${err.status}:`, err.message);
      },
    });
  }

  public editPost(post: Post): void {
    this._router.navigate(['/posts', post.id, 'edit']);
  }

  ngOnDestroy() {
    this._getPosts$?.unsubscribe();
  }
}
