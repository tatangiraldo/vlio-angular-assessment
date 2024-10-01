export interface Person {
  id: number;
  fullName: string;
  age: number;
  skills: string[];
}

export class Task {
  id: number;
  taskName: string;
  dueDate: {
    day: number;
    month: number;
    year: number;
  };
  completed: boolean;
  people: Person[];

  constructor(id: number = 0, taskName: string = '', completed: boolean = false, dueDate: any = {}, people: Person[] = []) {
    this.id = id;
    this.taskName = taskName;
    this.completed = completed;
    this.dueDate = dueDate;
    this.people = people;
  }
}
