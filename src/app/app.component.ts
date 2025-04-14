import { Component } from '@angular/core';
import { Book, BookService } from './book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'evo';
  private displayedColumns: string[] = ['id', 'title', 'author'];
  public columnsToDisplay: string[] = this.displayedColumns.slice();
  public books: Book[] = [...this.bookServ.books];
  public bookForm: FormGroup;

  constructor(private bookServ: BookService, private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(/^[а-яёА-ЯЁ]+$/)]],
      author: ['', [Validators.required, Validators.pattern(/^[а-яёА-ЯЁ]+$/)]],
    });
  }

  // Добавление книги в каталог через сервис и обновление таблицы
  private addBook({ author, title }: Book) {
    if (author && title) {
      this.bookServ.appendBook({ author, title });
      this.books = [...this.bookServ.books];
    }
  }

  public onSubmit(): void {
    if (this.bookForm.valid) {
      this.addBook(this.bookForm.value as Book);
      this.bookForm.reset();
    } else {
      this.bookForm.markAllAsTouched();
    }
  }

  public onReset(): void {
    this.bookForm.reset();
  }
}
