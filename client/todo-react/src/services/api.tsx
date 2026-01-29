import { type RawTodo } from "../types/todos";
import Todo from "../models/todo"

async function fetchTodos() {
  const response = await fetch('/api/todos');
  if (!response.ok) {
    throw new Error(`Failed to fetch todos. Status: ${response.status}`);
  }
  const rawTodos: RawTodo[] = await response.json();
  return rawTodos.map((rawTodo) => new Todo(rawTodo));
}

export default fetchTodos;