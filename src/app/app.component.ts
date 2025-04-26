import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddTodo, ClearTodosList } from 'src/store/actions/todos.action';
import { TodosItem } from 'src/store/models/todos.model';
import { TodosListState } from 'src/store/states/todos.state';

interface Todo {
  text?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public todoForm!: FormGroup;
  public todos: TodosItem[] | null = [];
  public dataSource!: MatTableDataSource<Post>;

  constructor(private _store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    // Инициализация формы ввода задач
    this.todoForm = this.fb.group({
      textTodoInput: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
        ],
      ],
    });
    // Подписка на изменение списка задач
    this._store.select(TodosListState.getTodos).subscribe({
      next: (value) => {
        this.todos = value;
        console.log('this._todos:', this.todos);
      },
      error: (err) => console.log('Ошибка призапросе данных из хранилища'),
    });
  }

  public onSubmit() {
    if (this.todoForm.valid) {
      this._store.dispatch(
        new AddTodo({
          text: this.todoForm.value.textTodoInput,
          status: true,
        })
      );
      this.onReset();
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  public onClearTodoList() {
    this._store.dispatch(new ClearTodosList());
  }

  // Сброс формы к начальному (валидному) состоянию
  public onReset(): void {
    // Сбрас значений полей к "" (вместо null)
    this.todoForm.reset({
      title: '',
      author: '',
    });

    // Сброс состояния формы
    this.todoForm.markAsPristine(); // нет изменений (dirty=false)
    this.todoForm.markAsUntouched(); // нет взаимодействия (touched=false)

    // Очиcтка ошибок валидации
    Object.keys(this.todoForm.controls).forEach((key) => {
      this.todoForm.get(key)?.setErrors(null);
    });

    // Принудительное обновление (для Angular Material)
    setTimeout(() => {
      this.todoForm.updateValueAndValidity();
    });
  }
}
