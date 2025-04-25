import { TodosItem } from '../models/todos.model';

export class AddTodo {
  static readonly type = '[TodosList] Add Todo';
  constructor(public payload: TodosItem) {
    this.payload.id = this.generateId();
    if (this.payload.status === undefined) this.payload.status = false;
  }
  // Генератор уникального идентификатора
  private generateId(): string {
    return crypto.randomUUID();
  }
}

// export class RemoveItem {
//   static readonly type = '[TodosList] Remove Todo';
//   constructor(public itemId: number) {}
// }

export class ClearTodosList {
  static readonly type = '[TodosList] Clear';
}
