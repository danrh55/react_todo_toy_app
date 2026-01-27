import { Todo } from '../types/todos';

export interface Selected {
  category: Category,
  listName: string,
}

// way to do type safety for due dates?
export type Category = 'all' | 'completed';

export class TodoListsContainer {
  #todos: Todo[];

  constructor(todos: Todo[]) {
    this.#todos = todos;
  }

  #completed() {
    return this.#todos.filter((todo) => todo.completed); 
  }
  // memonize so not done every time.
  #dueDateLists(todos: Todo[]) {
    let todosByDueDate: { [key: string]: Array<Todo>} = {};

    todos.forEach((todo) => {
      if (Object.hasOwn(todosByDueDate, todo.dueDate)) {
        todosByDueDate[todo.dueDate].push(todo);
      } else {
        todosByDueDate[todo.dueDate] = [todo];
      }
    });

    return todosByDueDate;
  }

  #sortByComplete(todos: Todo[]) {
    return todos.sort((todo1, todo2) => {
      if (!todo1.completed && todo2.completed) {
        return -1;
      } else if (todo1.completed && !todo2.completed) {
        return 1;
      }

      return 0;
    });
  }

  // getListLength(selected: Selected) {

  // }

  getList(selected: Selected) {
    const { category, listName } = selected;

    if (category === 'all' && listName === 'all') return this.#todos;
    if (category === 'completed' && listName === 'completed') return this.#completed();

    const todos = category === 'completed' ? this.#completed() : this.#todos;
    const lists = this.#dueDateLists(todos);
    
    return (listName in lists) ? this.#sortByComplete(lists[listName]) : [];
  }

  // might be redunctant?
  getDueDates(todos: Todo[]) {
    let noDueDateTodos = false;
    const dueDateTodos = todos.filter((todo) => {
      if (todo.dueDate === 'No Due Date') {
        noDueDateTodos = true;
        return false;
      }
      return true;
    });
    let sortedTodos = this.#sortByDate(dueDateTodos);
    let dueDates = sortedTodos.map((todo) => todo.dueDate);
    
    if (noDueDateTodos) {
      dueDates = ['No Due Date'].concat(dueDates);
    }
    
    return dueDates;
  }

  #sortByDate(todos: Todo[]) {
    return todos.sort((todo1, todo2) => {
      if (!todo1.date || !todo2.date) {
        throw ("Make sure to only pass in a list without any 'No Due Date' todos")
      }

      if (todo1.date < todo2.date) {
        return -1;
      } else if (todo1.date > todo2.date) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}

