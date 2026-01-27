import { type Category } from "../../types/lists";
import { useContext } from "react";
import { SelectedContext } from "../../App";

function DueDate(props: { category: Category, dueDate: string; numTodos: number }) {
  const { dueDate: listName, category, numTodos } = props;
  const { selected, setSelected} = useContext(SelectedContext);
  const className = (selected.category === category && selected.listName === listName) ? 'active' : '';

  return (
    <>
      <dl onClick={() => { setSelected({ category, listName }) }} className={className} data-title={listName} data-total={numTodos}>
        <dt><time>{listName}</time></dt>
        <dd>{numTodos}</dd>
      </dl>
    </>
  )
}

export default DueDate;