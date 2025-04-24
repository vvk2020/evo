import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostComponent } from './post/post.component';
import { AccessRoleGuard } from './access-role.guard';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'posts',
    // pathMatch: 'full',
    component: MainComponent,
  },
  {
    path: 'posts',
    component: PostsListComponent,
    // children: [
    //   {
    //     path: ':id',
    //     component: PostComponent,
    //     canActivateChild: [AccessRoleGuard] /* !!! */,
    //   },
    // ],
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
