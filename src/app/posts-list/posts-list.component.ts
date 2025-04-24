import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post, PostsService } from '../posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private postsService: PostsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  public getAllPosts(): void {
    this.isLoading = true;
    this._getPosts$?.unsubscribe(); // отписка от предыдущей подписки
    this._getPosts$ = this.postsService.getPosts().subscribe({
      next: (posts) => {
        this._posts = [...posts];
        this.dataSource = new MatTableDataSource(posts);
        this.isLoading = false;
        // Вывод данных в консоль
        // console.clear();
        // console.log('Выбранные посты:', posts);
      },
      error: (err: HttpErrorResponse) => {
        this._posts = [];
        this.isLoading = false;
        // Вывод ошибки в консоль
        console.clear();
        console.error(`Ошибка ${err.status}:`, err.message);
      },
    });
  }

  public editPost(post: Post): void {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      width: '500px',
      data: { ...post }, // передача копии поста в диалог
    });

  }

  ngOnDestroy() {
    this._getPosts$?.unsubscribe();
  }
}
