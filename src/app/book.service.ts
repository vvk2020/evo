import { Injectable } from '@angular/core';

export interface Book {
  id?: number; // номер по каталогу
  author: string; // автор книги
  title: string; // название книги
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _books: Book[] = [
    { id: 1, author: 'Михаил Булгаков', title: 'Мастер и Маргарита' },
    { id: 2, author: 'Станислав Лем', title: 'Солярис' },
    { id: 3, author: 'Габриэль Гарсиа Маркес', title: 'Сто лет одиночества' },
  ];

  private _lastId: number = 0; // текущий максимум _books[].id

  public get books(): Book[] {
    return this._books;
  }

  constructor() {
    // Определение максимального id по данным исходного _books[]
    if (!this._lastId) this.getMaxIdBook();
  }

  // Метод добавления новой книги
  public appendBook(book: Book) {
    if (book) {
      const newBook = {
        id: book.id ?? this.generateId(),
        ...book,
      };
      this._books = [...this._books, newBook];
    }
  }

  // Генератор id новой книги в каталоге
  private generateId(): number {
    return ++this._lastId;
  }

  // Определение максимального id (только при старте)
  getMaxIdBook(): number {
    if (this._books.length > 0)
      this._lastId = this._books.reduce((prev, book) => {
        if (book.id) return Math.max(prev, book.id);
        return prev;
      }, 0);
    return this._lastId;
  }
}
