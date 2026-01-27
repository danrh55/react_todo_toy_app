import './stylesheets/App.css';
import Sidebar from './components/sidebar/sidebar';
import ActiveList from './components/active/activeList';
import { createContext, useEffect, useState } from 'react';
import fetchTodos from './services/api';
import { type Selected } from './types/lists';
import { TodoListsContainer } from './types/lists';
import { type MouseEvent } from 'react';

export const SelectedContext = createContext<{ selected: Selected, setSelected: Function }>({ selected: { category: 'all', listName: 'all' }, setSelected: () => {}});
export const TodosContext = createContext<{ todoLists: TodoListsContainer, setTodoLists: Function }>({ todoLists: new TodoListsContainer([]), setTodoLists: () => {}});

function App() {
  const [selected, setSelected] = useState<Selected>({ category: 'all', listName: 'all'});
  const [todoLists, setTodoLists] = useState(new TodoListsContainer([]));

  useEffect(() => {
    (async () => {
      const todos = await fetchTodos();
      setTodoLists(new TodoListsContainer(todos));
    })();
  }, []);

  function toggleSidebar(e: MouseEvent) {
    const checkbox = e.target as HTMLInputElement;
    checkbox.checked;
  }

  return (
    <>
      <input type="checkbox" id="sidebar_toggle" onClick={(e) => toggleSidebar(e)} defaultChecked={false}/>
      <SelectedContext value={{ selected, setSelected }}>
        <TodosContext value={{ todoLists, setTodoLists }}>
          <Sidebar></Sidebar>
          <ActiveList></ActiveList> 
        </TodosContext>
      </SelectedContext>
    </>
  )
}

export default App;
