


  import { createReducer, on } from '@ngrx/store';
  import { addTask, updateTask, deleteTask, addPersonToTask, removePersonFromTask, updatePersonInTask } from './task.actions';
  import { Task } from '../models/task.model';
  
  export interface TaskState {
    tasks: Task[];
  }
  
  export const initialState: TaskState = {
    tasks: [
      {
        id: Date.now(),
        taskName: 'task 1',
        completed: false,
        dueDate: {
          day: 15,
          month:10,
          year: 2024
        },
        people: [
          {
            id: Date.now()+1,
            fullName: 'Jhonnatan',
            age: 34,
            skills: ['PHP', 'C#', 'ANGULAR', 'REACT']
          },
          {
            id: Date.now()+2,
            fullName: 'Jhon Doe',
            age: 30,
            skills: ['C', 'Javascript']
          }
        ]
      },
      {
        id: Date.now()+3,
        taskName: 'task 2',
        completed: false,
        dueDate: {
          day: 7,
          month: 10,
          year: 2024
        },
        people: [
          {
            id: Date.now()+4,
            fullName: 'Jhonnatan',
            age: 34,
            skills: ['PHP', 'C#', 'ANGULAR', 'REACT']
          },
          {
            id: Date.now()+5,
            fullName: 'Smith Doe',
            age: 30,
            skills: ['Phyton', 'Git']
          }
        ]
      },
    ]
  };
  
  export const taskReducer = createReducer(
    initialState,
    on(addTask, (state, { task }) => ({
      ...state,
      tasks: [...state.tasks, task]
    })),
    on(updateTask, (state, { taskId, changes }) => {
      const updatedTasks = state.tasks.map(task => 
        task.id === taskId ? { ...task, ...changes } : task
      );
      return { ...state, tasks: updatedTasks };
    }),
    on(deleteTask, (state, { taskId }) => ({
      ...state,
      tasks: state.tasks.filter(task => task.id !== taskId)
    })),
    on(addPersonToTask, (state, { taskId, person }) => {
      const updatedTasks = state.tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            people: [...task.people, person] // Agregar persona a la tarea
          };
        }
        return task;
      });
      return { ...state, tasks: updatedTasks };
    }),
    on(updatePersonInTask, (state, { taskId, personName, changes }) => {
      const updatedTasks = state.tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            people: task.people.map(person => 
              person.fullName === personName ? { ...person, ...changes } : person
            )
          };
        }
        return task;
      });
      return { ...state, tasks: updatedTasks };
    }),
    on(removePersonFromTask, (state, { taskId, personName }) => {
      const updatedTasks = state.tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            people: task.people.filter(person => person.fullName !== personName) // Eliminar persona de la tarea
          };
        }
        return task;
      });
      return { ...state, tasks: updatedTasks };
    })
  );
  