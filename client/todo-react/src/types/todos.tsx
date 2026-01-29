export interface RawTodo {
  id: number;
  title: string;
  day: string;
  month: string;
  year: string;
  completed: boolean;
  description: string;
}

export interface Selected {
  category: Category,
  listName: SystemListName | UserListName,
}

export type SystemListName = 'all' | 'completed' | 'No Due Date';
export type UserListName = string; // e.g. '05/26'
export type Category = 'all' | 'completed';
export type ModalInputs = Omit<RawTodo, 'id'>
