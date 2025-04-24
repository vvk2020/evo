import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Компоненты, сервисы, Guard
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PostsService } from './posts.service';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';
import { EditPostGuard } from './edit-post.guard';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    PostsListComponent,
    MainComponent,
    EditPostDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Angular Material
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [PostsService, EditPostGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
