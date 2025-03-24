import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TransformDatePipe } from './transform-date.pipe';
import { Add5Pipe } from './add5.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TransformDatePipe,
    Add5Pipe,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
