import './stylesheets/App.css';
import Sidebar from './components/sidebar/sidebar';
import ActiveList from './components/active/activeList';
import { SelectedProvider } from './components/providers/selectedProvider';
import { TodoListProvider } from './components/providers/todoListsProvider';

function App() {
  return (
    <>
      <SelectedProvider>
        <TodoListProvider>
          <input type="checkbox" id="sidebar_toggle" defaultChecked={false} />
          <Sidebar />
          <ActiveList />
        </TodoListProvider>
      </SelectedProvider>
    </>
  )
}

export default App;
