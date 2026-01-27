export interface RawTodo {
  id: number;
  title: string;
  day: string;
  month: string;
  year: string;
  completed: boolean;
  description: string;
}

export class Todo {
  title: string;
  id: number;
  day: string;
  dueDate: string;
  completed: boolean;
  date: Date | undefined;
  description: string;

  constructor(data: RawTodo) {
    this.title = data.title;
    this.id = data.id;
    this.day = data.day;
    this.dueDate = this.#getDueDate(data);
    this.completed = data.completed;
    this.date = this.#getDate(data);
    this.description = data.description;
  }

  #getDueDate(data: RawTodo) {
    let month = data.month;
    let year = data.year;
    let noDueDate = (month === 'mt' || year === 'year');
  
    return noDueDate ? 'No Due Date' : `${month}/${year.slice(2)}`;
  }

  #getDate(data: RawTodo) {
    let day = parseInt(data.day, 10) || undefined;
    let year = parseInt(data.year, 10) || undefined;
    let month = parseInt(data.month, 10) || undefined;

    if (day && month && year) {
      return new Date(year, month - 1, day);
    } else if (month && year) {
      return new Date(year, month - 1);
    } else {
      return undefined;
    }
  }
}
