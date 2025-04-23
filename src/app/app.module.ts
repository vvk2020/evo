import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostComponent } from './post/post.component';
import { DataService } from './data.service';
import { AccessRoleGuard } from './access-role.guard';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    PostsListComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DataService, AccessRoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
