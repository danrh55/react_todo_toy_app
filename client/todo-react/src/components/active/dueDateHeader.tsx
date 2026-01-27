import { capitalize } from "lodash";

function DueDateHeader({ title, numTodos }: { title: string, numTodos: number }) {
  title = title === 'all' ? `All Todos` : capitalize(title);

  return (
    <header>
       <label htmlFor="sidebar_toggle">
        <img src="images/hamburger.png" alt="Toggle Sidebar" />
      </label>
      <dl>
        <dt>
          <time>{title}</time>
        </dt>
        <dd>{numTodos}</dd>
      </dl>
    </header>
  )
}

export default DueDateHeader;