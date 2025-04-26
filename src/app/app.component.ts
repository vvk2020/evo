import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class AppComponent implements OnInit {
  todoForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.todoForm = this.fb.group({
      textTodoInput: ['', Validators.required, Validators.pattern(/^[*]{3,200}$/)], // можно добавать валидаторы
    });
  }

  public onAddTodo() {
    if (this.todoForm.invalid) return;
    this.store.dispatch(
      new AddTodo({
        text: this.todoForm.value.textTodoInput,
        status: true,
      })
    );
    this.todoForm.reset();
  }

  public onClearTodoList() {
    this.store.dispatch(new ClearTodosList());
  }
}
