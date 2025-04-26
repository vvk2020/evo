/**
 * Задача из списка задач
 * @param {number} id уникальный идентификатор задачи
 * @param {string} text текст задачи
 * @param {boolean} status статус задачи (false - ожидает, true - выполнена)
 */
export interface TodosItem {
  id?: string;
  text: string;
  status?: boolean;
}

/**
 * Список задач
 * @param {TodosItem[]} todos массив задач
 */
export interface TodosList {
  todos: TodosItem[] | undefined;
  // ... другие свойства списка
}
