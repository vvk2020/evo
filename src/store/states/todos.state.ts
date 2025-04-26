import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TodosList } from '../models/todos.model';
import { Injectable } from '@angular/core';
import {
  AddTodo,
  ClearTodosList,
  RemoveTodo,
  ToggleStatusTodo,
} from '../actions/todos.action';

@State<TodosList>({
  name: 'TodosListState',
  defaults: {
    todos: [],
  },
})
@Injectable()
export class TodosListState {
  // Запросы данных из хранилища
  @Selector()
  static getTodos(state: TodosList) {
    return state.todos;
  }

  // Добавление задачи в хранилище
  @Action(AddTodo)
  addTodo(ctx: StateContext<TodosList>, action: AddTodo) {
    const state = ctx.getState();
    if (state.todos) {
      ctx.patchState({
        todos: [...state.todos, { ...action.payload }],
      });
    }
  }

  // Удаление задачи из хранилища
  @Action(RemoveTodo)
  removeTodo(ctx: StateContext<TodosList>, action: RemoveTodo) {
    // Фильтруем список задач (удаляем задачу по уникальному id)
    const state = ctx.getState();
    if (state.todos) {
      const newTodos = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      // Обновляем список задач
      ctx.patchState({
        todos: [...newTodos],
      });
    }
  }

  // Удаление задачи из хранилища
  @Action(ToggleStatusTodo)
  toggleStatusTodo(ctx: StateContext<TodosList>, action: ToggleStatusTodo) {
    // Поиск и изменение статуса задачи в списке
    const state = ctx.getState();
    if (state.todos) {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) todo.status != todo.status;
        return todo;
      });
      // Обновляем список задач
      ctx.patchState({
        todos: [...newTodos],
      });
    }
  }

  // Очистка списка задач в хранилище
  @Action(ClearTodosList)
  clearTodoList(ctx: StateContext<TodosList>) {
    ctx.patchState({ todos: [] });
  }

}
