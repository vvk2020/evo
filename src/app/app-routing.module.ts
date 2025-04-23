import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostComponent } from './post/post.component';
import { AccessRoleGuard } from './access-role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'posts',
    component: PostsListComponent,
    children: [
      {
        path: ':id',
        component: PostComponent,
        canActivateChild: [AccessRoleGuard], /* !!! */
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
