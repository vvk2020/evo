import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddTodo, ClearTodosList } from 'src/store/actions/todos.action';

interface Todo {
  text?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public onAddTodo() {
    this.store.dispatch(
      new AddTodo({
        // id: 777,
        text: 'wow',
        status: true,
      })
    );
  }
  // public todo: Todo = {};

  public onClearTodoList() {
    this.store.dispatch(new ClearTodosList());
  }

  constructor(private store: Store) {}
}
