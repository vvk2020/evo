import { Component, OnInit } from '@angular/core';
import { BooksService, Post } from '../books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  // public Data: Post = {} as Post;
  public Data: string = 'объект не передан'; // упрощение для вывода (должно быть Post)
  public updPeriod: number = 250; // период запроса к сервису

  constructor(public booksServ: BooksService) {}
  /* Реализовано через seInterval() только в целях демонстрации автозапросов
  данных у сервиса BooksService.  Альтернативный (корректный) вариант -
  использование @Input/ @Output */
  ngOnInit(): void {
    setInterval(() => {
      const objText = JSON.stringify(this.booksServ.Data)
      if (objText && objText!='{}') this.Data = objText;
    }, this.updPeriod);
  }
}
