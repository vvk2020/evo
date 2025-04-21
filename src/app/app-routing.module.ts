import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PostsViewResolver } from './posts-view.resolver';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: 'post',
    component: PostComponent,
    resolve: { post: PostsViewResolver },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
