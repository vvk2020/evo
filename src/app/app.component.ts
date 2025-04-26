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
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      textTodoInput: ['', Validators.required], // можно добавать валидаторы
    });
  }

  public onAddTodo() {
    if (this.form.invalid) return;
    this.store.dispatch(
      new AddTodo({
        // id: 777,
        text: this.form.value.textTodoInput,
        status: true,
      })
    );
    this.form.reset();
  }

  public onClearTodoList() {
    this.store.dispatch(new ClearTodosList());
  }
}
