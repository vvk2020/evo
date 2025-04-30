import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public todoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Инициализация формы ввода задач
    this.todoForm = this.fb.group({
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });

    // Подписка на изменение списка задач
    // this._store.select(TodosListState.getTodos).subscribe({
    //   next: (value) => {
    //     this.todos = new MatTableDataSource(value);
    //   },
    //   error: (err) => console.log('Ошибка:', err),
    // });
  }

  public onSubmit() {
    // вызов изменения значения поля для активации валидации (реактивные формы)
    this.todoForm.patchValue({
      login: this.todoForm.value.login,
      password: this.todoForm.value.password,
    });
    // Валидация и добавление задачи
    if (this.todoForm.valid) {
      // this._store.dispatch(
      //   new AddTodo({
      //     text: this.todoForm.value.login,
      //   })
      // );
      this.onReset();
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  // Сброс формы добавления задачи к валидному состоянию
  public onReset(): void {
    // Сброс значений полей ("" вместо null)
    this.todoForm.reset({
      login: '',
      password: '',
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
