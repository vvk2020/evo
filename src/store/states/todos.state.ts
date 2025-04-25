import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TodosList } from '../models/todos.model';
import { Injectable } from '@angular/core';
import { AddTodo } from '../actions/todos.action';

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
  static getToken(state: TodosList) {
    return state.todos;
  }

  // Запись данных в хранилище

  @Action(AddTodo)
  addTodo(ctx: StateContext<TodosList>, action: AddTodo) {
    const state = ctx.getState();
    // const existingItem = state.todos?.find(item => item.id === action.payload.id);

    if (state.todos) {
      ctx.setState({
        todos: [...state.todos, { ...action.payload }],
      });
    }

    // if (existingItem) {
    //   ctx.patchState({
    //     items: state.items.map(item =>
    //       item.id === action.payload.id
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item
    //     ),
    //     total: state.total + action.payload.price
    //   });
    // } else {
    //   ctx.setState({
    //     items: [...state.items, { ...action.payload, quantity: 1 }],
    //     total: state.total + action.payload.price
    //   });
    // }

    // ctx.patchState({
    //   todos: action.payload.todos,
    // });
  }

  // @Action(AddToCart)
  // addItem(
  //   ctx: StateContext<CartStateModel>,
  //   action: AddToCart
  //   )
  //   {
  //     const state = ctx.getState();
  //     const existingItem = state.items.find(item => item.id === action.payload.id);
  //     if (existingItem) {
  //       ctx.patchState({
  //         items: state.items.map(item =>
  //           item.id === action.payload.id
  //             ? { ...item, quantity: item.quantity + 1 }
  //             : item
  //         ),
  //         total: state.total + action.payload.price
  //       });
  //     } else {
  //       ctx.setState({
  //         items: [...state.items, { ...action.payload, quantity: 1 }],
  //         total: state.total + action.payload.price
  //       });
  //     }
  //   }

  // @Action(RemoveFromCart)
  // removeItem(ctx: StateContext<CartStateModel>, action: RemoveFromCart) {
  //   const state = ctx.getState();
  //   const itemToRemove = state.items.find(item => item.id === action.itemId);
  //   if (!itemToRemove) return;
  //   ctx.patchState({
  //     items: state.items.filter(item => item.id !== action.itemId),
  //     total: state.total - (itemToRemove.price * itemToRemove.quantity)
  //   });
  // }
  // @Action(ClearCart)
  // clearCart(ctx: StateContext<CartStateModel>) {
  //   ctx.setState({ items: [], total: 0 });
  // }
}
