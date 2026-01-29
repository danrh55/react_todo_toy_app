import DueDateHeader from "./dueDateHeader";
import AddTodoButton from "./addTodo";
import Modal from "../modal/modal";
import TodoItem from "./todo";
import { useSelected } from "../providers/selectedProvider";
import { useTodoLists } from "../providers/todoListsProvider";
 
function ActiveList() {
  const { selected } = useSelected();
  const { todoLists } = useTodoLists();
  let activeTodos = todoLists.getList(selected);
  
  return (
    <div id="items">
      <DueDateHeader title={selected.listName} numTodos={activeTodos.length}></DueDateHeader>
      <main>
        <AddTodoButton></AddTodoButton>
        <table style={{ borderSpacing: 0 }}>
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
