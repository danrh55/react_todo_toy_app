import { Todo, type RawTodo } from "../types/todos";

async function fetchTodos() {
  let response = await fetch('/api/todos');
  let rawTodos: RawTodo[] = await response.json();
  return rawTodos.map((rawTodo) => new Todo(rawTodo))
}

export default fetchTodos;