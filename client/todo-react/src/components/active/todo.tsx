import { useContext } from "react";
import { Todo } from "../../types/todos";
import { TodosContext } from "../../App";
import fetchTodos from "../../services/api";
import { TodoListsContainer } from "../../types/lists";
import { type MouseEvent } from "react";

function TodoItem(props: { todo: Todo }) {
  const { setTodoLists } = useContext(TodosContext);
  const { todo } = props;
  const { id, dueDate, title } = todo;
  
  async function deleteTodo(e: MouseEvent) {
    e.stopPropagation();
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTodoLists(new TodoListsContainer(await fetchTodos()));
    } else {
      alert(`Failed to delete todo! ${response.status}`);
    }
  }

  function populateTodoModal(form: HTMLFormElement, todo: Todo) {
    form.setAttribute('data-id', String(todo.id));
    form.todoTitle.value = todo.title;
    const day = todo.day;
    const month = todo.date?.getMonth();
   
    form.day.value = day ? String(day).padStart(2, '0') : 'dy';
    form.month.value = month ? String(month + 1).padStart(2, '0') : 'mt';
    form.year.value = todo.date?.getFullYear() || 'year';
    form.description.value = todo.description;
  }

  function showTodoModal(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const modalLayer = document.getElementById('modal_layer');
    const formModal = document.getElementById('form_modal');
    const form = document.querySelector('#form_modal form') as HTMLFormElement;

    if (modalLayer && formModal && form) {
      modalLayer.style.display = 'block';
      formModal.style = 'display: block; top: 200px;';
      populateTodoModal(form, todo);
    }
  }
  async function toggleComplete() {
    const completed = (todo.completed ? false : true); 
    const json = JSON.stringify({ completed });

    const response = await fetch(`/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: json,
    });

  if (response.ok) {
    setTodoLists(new TodoListsContainer(await fetchTodos()));
  } else {
    alert(`Could not toggle complete! Error: ${response.status}`);
  }
}

  return (
    <tr onClick={toggleComplete} data-id={id}>
      <td className="list_item">
        <input type="checkbox" name={`item_${id}`} id={`item_${id}`} checked={todo.completed} readOnly></input>
        <span className="check"></span>
        <label onClick={(e) => showTodoModal(e)} htmlFor={`item_${id}`}>{`${title} - ${dueDate}`}</label>
      </td>
      <td onClick={(e) => deleteTodo(e)} className="delete"><img src="images/trash.png" alt="Delete"/></td>
    </tr>
  )
}

export default TodoItem;
