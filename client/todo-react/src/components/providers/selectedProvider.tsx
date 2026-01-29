import { type Selected } from "../../types/todos"
import { useState, useMemo, useContext, createContext, type Dispatch, type SetStateAction } from "react";

type SelectedContextValue = {
    selected: Selected;
    setSelected: Dispatch<SetStateAction<Selected>>;
  };
  
const SelectedContext = createContext<SelectedContextValue | null>(null);

export function useSelected() {
  const context = useContext(SelectedContext);
  if (!context) {
    throw new Error('useSelected must be used within a SelectedContext.Provider');
  }
  return context;
}

export function SelectedProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Selected>({ category: 'all', listName: 'all'});

  const selectedValue = useMemo(() => {
    return { selected, setSelected };
  }, [selected, setSelected]);

  return (
    <SelectedContext.Provider value={selectedValue}>
      {children}
    </SelectedContext.Provider>
  )
}
