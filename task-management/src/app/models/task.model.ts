export interface Person {
  id: number;
  fullName: string;
  age: number;
  skills: string[];
}

export class Task {
  id: number;
  title: string;
  dueDate: {
    day: number;
    month: number;
    year: number;
  };
  completed: boolean;
  people: Person[];

  constructor(id: number = 0, title: string = '', completed: boolean = false, dueDate: any = {}, people: Person[] = []) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.dueDate = dueDate;
    this.people = people;
  }
}
