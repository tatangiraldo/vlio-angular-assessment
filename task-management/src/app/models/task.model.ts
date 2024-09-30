export interface Person {
    id: number;
    fullName: string;
    age: number;
    skills: string[];
  }
  
  export interface Task {
    id: number;
    taskName: string;
    dueDate: string;
    completed: boolean;
    people: Person[];
  }