import CategoryHeader from "./categoryHeader";
import DueDate from "./dueDate";
import { type Category } from "../../types/lists";
import { useContext } from "react";
import { TodosContext } from "../../App";

function CategoryList(props: { category: Category }) {
  const { category } = props;
  const { todoLists } = useContext(TodosContext);
  const todos = todoLists.getList({ category: category, listName: category });
  // friction from separating category list vs duedate list
  return (
    <section id={category}>
      <CategoryHeader category={category} numTodos={todos.length}></CategoryHeader>
      <article>
        { // abstract out length of todos
          todoLists.getDueDates(todos).map((dueDate) => <DueDate key={dueDate} category={category} dueDate={dueDate} numTodos={todoLists.getList({category: category, listName: dueDate}).length}></DueDate>)
        }
      </article>
    </section>
  )
}

export default CategoryList