import { Component } from '@angular/core';
import { BooksService, Post } from './books.service'; // интерфейс обмена данных

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'evo';
  public Id: number = 1;

  constructor(private booksServ: BooksService) {}

  private exampleData: Post = {
    postId: 1,
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
  };

  public transferData(): void {
    this.exampleData.id = this.Id; // предполагем, что данные введены корректно
    this.booksServ.Data = this.exampleData;
  }
}
