import { type Category } from "../../types/todos";
import { capitalize } from 'lodash';
import { useSelected } from "../providers/selectedProvider";

function CategoryHeader(props: { category: Category; numTodos: number }) {
  const { category, numTodos } = props;
  const { selected, setSelected } = useSelected();
  const title = category === 'completed' ? category : `${category} Todos`;
  const className = (selected.category === category && selected.listName === category) ? 'active': '';
  const listName = category;

  return (
    <>
      <header onClick={() => { setSelected({ category, listName }) }} className={className} data-title={title} data-total={numTodos} id={`${category}_todos`}>
        <dl>
          <dt>{capitalize(title)}</dt>
          <dd>{numTodos}</dd>
        </dl>
      </header>
    </>
  )
}

export default CategoryHeader;