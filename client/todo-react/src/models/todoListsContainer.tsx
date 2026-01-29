import Todo from "./todo"
import { type Selected } from "../types/todos"

class TodoListsContainer {
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
      return [...todos].sort((todo1, todo2) => {
        if (!todo1.completed && todo2.completed) {
          return -1;
        } else if (todo1.completed && !todo2.completed) {
          return 1;
        }
  
        return 0;
      });
    }
  
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
  
      const sortedTodos = this.#sortByDate(dueDateTodos);
      const seen = new Set<string>();
      let dueDates: string[] = [];
      sortedTodos.forEach((todo) => {
        if (!seen.has(todo.dueDate)) {
          seen.add(todo.dueDate);
          dueDates.push(todo.dueDate);
        }
      });
      
      if (noDueDateTodos) {
        dueDates = ['No Due Date'].concat(dueDates);
      }
      
      return dueDates;
    }
  
    #sortByDate(todos: Todo[]) {
      return [...todos].sort((todo1, todo2) => {
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
  
export default TodoListsContainer;