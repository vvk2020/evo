import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { PostsService } from './posts.service';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';
import { AccountService } from './account.service';
import { ErrorComponent } from './error/error.component';

@Injectable({
  providedIn: 'root',
})
export class EditPostGuard implements CanActivate {
  constructor(
    private _accountService: AccountService,
    private _dialog: MatDialog,
    private _postsService: PostsService,
    private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const postId = route.params['id'];
    if (this._accountService.role === 'admin') {
      // Отображение окна редактирования поста
      return this._postsService.getPostById(postId).pipe(
        map((post) => {
          const dialogRef = this._dialog.open(EditPostDialogComponent, {
            width: '500px',
            data: { ...post },
          });

          dialogRef.afterClosed().subscribe((result) => {
            // Возврат к списку постов после закрытия
            this._router.navigate(['/posts']);
          });
          return false; // запрет активации маршрута
        })
      );
    } else {
      // Отображение окна блокировки доступа
      this._dialog.open(ErrorComponent, {
        width: '500px',
      });
      return false; // запрет активации маршрута
    }
  }
}
