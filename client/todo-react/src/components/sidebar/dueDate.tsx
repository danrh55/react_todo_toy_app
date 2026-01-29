import { type Category } from "../../types/todos";
import { useSelected } from "../providers/selectedProvider"

function DueDate(props: { category: Category, dueDate: string; numTodos: number }) {
  const { dueDate: listName, category, numTodos } = props;
  const { selected, setSelected} = useSelected();
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