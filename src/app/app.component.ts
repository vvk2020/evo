import { Component } from '@angular/core';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'evo';

  constructor(private bookServ: BookService) {
    bookServ.appendBook({ author: 'vvk', title: 'fury' });
    bookServ.appendBook({ author: 'vvk', title: 'fury' });
    console.log('bookServ.books:', bookServ.books);
  }
}
