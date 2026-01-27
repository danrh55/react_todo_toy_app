import SelectDate from "./selectDate";
import { type ModalInputs } from "../../types/modal";
import { TodosContext } from "../../App";
import { useContext } from "react";
import fetchTodos from "../../services/api";
import { TodoListsContainer } from "../../types/lists";
import { type FormEvent } from "react";

function ModalForm(props: { hideModal: Function }) {
  const { setTodoLists } = useContext(TodosContext);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const inputs = Object.fromEntries(new FormData(form).entries());
    
    // fix this later with types.
    const data: ModalInputs = {
      ...inputs,
      title: inputs.todoTitle,
    }
    delete data.todoTitle;
    const id = form.dataset.id
  
    if (id) {
      updateTodo(data, id);
    } else {
      addTodo(data);
    }
  }
  
  async function addTodo(data: ModalInputs) {
    if (data.title.length < 3) {
      alert('You must enter a title at least 3 characters long.');
      return;
    }

    let json = JSON.stringify(data);

    let response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: json,
    });

    if (response.ok) {
      setTodoLists(new TodoListsContainer(await fetchTodos()));
      props.hideModal();
    } else {
      alert(`Failed to add Todo! Status: ${response.status}`)
    }
  }

  async function updateTodo(data: ModalInputs, id: number) {
    if (data.month === 'mt' || data.year === 'year') { 
      data.day = 'dy';
    }

    let json = JSON.stringify(data);

    let response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: json,
    });

    if (response.ok) {
      setTodoLists(new TodoListsContainer(await fetchTodos()));
      props.hideModal();
    } else {
      alert(`Failed to update Todo! Error: ${response.status}`);
    }
  }

  async function markAsComplete() {
    let form = document.querySelector('form');
    let todoId;

    if (form) {
      todoId = form.dataset.id
    }

    try {
      let json = JSON.stringify({ completed: true });

      let response = await fetch(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: json,
      });

      if (response.ok) {
        setTodoLists(new TodoListsContainer(await fetchTodos()));
        props.hideModal();
      } else {
        alert(`Could not mark as complete. ${response.status} `)
      }
    } catch (e) {
      alert('Cannot mark as complete as item has not been created yet!');
    }
  }

  return (
    <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
      <fieldset>
        <ul>
          <li>
            <label htmlFor="todoTitle">Title</label>
            <input type="text" name="todoTitle" id="todoTitle" placeholder="Item 1" />
          </li>
          <SelectDate></SelectDate>
          <li>
            <label htmlFor="description">Description</label>
            <textarea cols={50} name="description" rows={7} placeholder="Description"></textarea>
          </li>
          <li>
            <input type="submit" value="Save"/>
            <button onClick={markAsComplete} type="button" name="complete">Mark As Complete</button>
          </li>
        </ul>
      </fieldset>
    </form>
  )
}

export default ModalForm;
