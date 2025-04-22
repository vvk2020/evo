import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { TodosInterceptor } from './todos.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
  ],
  providers: [
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: TodosInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
