import { TodosItem } from '../models/todos.model';

// Класс добавления задачи в список
export class AddTodo {
  static readonly type = '[TodosList] Add Todo';
  constructor(public payload: TodosItem) {
    this.payload.id = this.generateId();
    if (this.payload.status === undefined) this.payload.status = false;
  }
  // Генератор уникального id задачи
  private generateId(): string {
    return crypto.randomUUID();
  }
}

// Класс удаления задачи из списка
export class RemoveTodo {
  static readonly type = '[TodosList] Remove Todo';
  constructor(public payload: TodosItem) {}
}

// Класс изменения статуса задачи
export class ToggleStatusTodo {
  static readonly type = '[TodosList] ToggleStatus Todo';
  constructor(public payload: TodosItem) {}
}

// Класс очистки списка
export class ClearTodosList {
  static readonly type = '[TodosList] Clear';
}

// Класс загрузки списка задач из локального хранилища
export class LoadTodosListFromLocalStorage {
  static readonly type = '[TodosList] Load From LocalStorage';
}
