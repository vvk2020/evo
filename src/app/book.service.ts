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

  public get books(): Book[] {
    return this._books;
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

  // Генератор id книги
  private generateId(): number {
    // Формирование массива книг с числовыми id
    const ids = this._books
      .map((book) => book.id ?? 0)
      .filter((id) => typeof id === 'number');
    // Определение максимального id в ids[]
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return maxId + 1;
  }
}
