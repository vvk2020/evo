import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { HttpErrorResponse } from '@angular/common/http';

interface ToDo {
  completed?: boolean;
  id?: number;
  title?: string;
  userId?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public todo: ToDo = {};
  public tmp: ToDo = {};

  constructor(private dataServ: DataService) {}

  ngOnInit(): void {
    this.dataServ.getToDos().subscribe({
      next: (resp: any) => {
        this.todo = this.getTodoFromResponse(resp);
        console.log('todo:', this.todo);
      },
      error: (err: HttpErrorResponse) => {
        console.log('Ошибка:', err);
      },
    });
  }

  getTodoFromResponse(data: any): ToDo {
    let todo: ToDo = {};
    if (typeof data === 'object' && data !== null) {
      if ('completed' in data && typeof data.completed === 'boolean')
        todo.completed = data.completed;
      if ('id' in data && typeof data.id === 'number') todo.id = data.id;
      if ('title' in data && typeof data.title === 'string')
        todo.title = data.title;
      if ('userId' in data && typeof data.userId === 'number')
        todo.userId = data.userId;
    }
    return todo;
  }
}
