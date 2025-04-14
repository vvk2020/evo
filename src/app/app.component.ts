import { Component } from '@angular/core';
import { Book, BookService } from './book.service';

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

  constructor(private bookServ: BookService) {
  }

  // Добавление книги в каталог через сервис и обновление таблицы
  public addBook() {
    this.bookServ.appendBook({ author: 'kvv', title: 'fury' });
    this.books = [...this.bookServ.books];
  }
}
