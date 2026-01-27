import { useContext } from "react";
import { SelectedContext, TodosContext } from "../../App";
import DueDateHeader from "./dueDateHeader";
import AddTodoButton from "./addTodo";
import Modal from "../modal/modal";
import TodoItem from "./todo";
 
function ActiveList() {
  const { selected } = useContext(SelectedContext);
  const { todoLists } = useContext(TodosContext);
  let activeTodos = todoLists.getList(selected);
  
  return (
    <div id="items">
      <DueDateHeader title={selected.listName} numTodos={activeTodos.length}></DueDateHeader>
      <main>
        <AddTodoButton></AddTodoButton>
        <table border-spacing={0}>
          <tbody>
            { 
              activeTodos.map((todo) => {
                return <TodoItem key={todo.id} todo={todo} ></TodoItem>
              })
            }
          </tbody>
        </table>
        <Modal></Modal>
      </main>
    </div>
  )
}

export default ActiveList;
