import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { MainComponent } from './main/main.component';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';
import { EditPostGuard } from './edit-post.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'posts',
    component: PostsListComponent,
    children: [
      {
        path: ':id/edit',
        component: EditPostDialogComponent,
        canActivate: [EditPostGuard],
      },
    ],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
