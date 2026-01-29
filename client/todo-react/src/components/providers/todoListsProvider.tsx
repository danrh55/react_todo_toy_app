import { useContext, createContext, useEffect, useState, type Dispatch, type SetStateAction, useMemo } from "react";
import TodoListsContainer from "../../models/todoListsContainer";
import fetchTodos from "../../services/api";

type TodosContextValue = {
    todoLists: TodoListsContainer;
    setTodoLists: Dispatch<SetStateAction<TodoListsContainer>>;
};

const TodosContext = createContext<TodosContextValue | null >(null);

export function useTodoLists() {
    const context = useContext(TodosContext);
    if (!context) {
      throw new Error('useTodoLists must be used within a TodosContext.Provider');
    }
    return context;
}

export function TodoListProvider({ children }: { children: React.ReactNode}) {
    const [todoLists, setTodoLists] = useState<TodoListsContainer>(() => new TodoListsContainer([]));

    useEffect(() => {
        (async () => {
            try {
                const todos = await fetchTodos();
                setTodoLists(new TodoListsContainer(todos));
            } catch (e) {
                console.error(e);
                alert('Failed to load todos. Is the API server running?');
            }
        })();
    }, []);

    const todosValue = useMemo(() => {
        return { todoLists, setTodoLists };
      }, [todoLists, setTodoLists]);

    return (
         <TodosContext.Provider value={todosValue}>
            {children}
        </TodosContext.Provider>
    )
}
