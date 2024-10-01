import { Action, createReducer, on } from '@ngrx/store';
import { addTask, deleteTask, updateTask } from './task.actions';
import { Task } from '../models/task.model';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [
    {
      id: 1,
      taskName: 'task 1',
      completed: false,
      dueDate: "2024-10-05",
      people: [
        {
          id: 123,
          fullName: 'Jhonnatan',
          age: 34,
          skills: ['PHP', 'C#', 'ANGULAR', 'REACT']
        },
        {
          id: 124,
          fullName: 'Jhon Doe',
          age: 30,
          skills: ['C', 'Javascript']
        }
      ]
    },
    {
      id: 2,
      taskName: 'task 2',
      completed: false,
      dueDate: "2024-10-15",
      people: [
        {
          id: 123,
          fullName: 'Jhonnatan',
          age: 34,
          skills: ['PHP', 'C#', 'ANGULAR', 'REACT']
        },
        {
          id: 126,
          fullName: 'Pepe',
          age: 30,
          skills: ['Phuton', 'Git']
        }
      ]
    },
  ]
};

const _taskReducer = createReducer(
  initialState,
  
  // Manejar acción para agregar una tarea
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  
  // Manejar acción para eliminar una tarea
  on(deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== taskId)
  })),
  
  // Manejar acción para actualizar una tarea (marcar como completada)
  on(updateTask, (state, { taskId, changes }) => ({
    ...state,
    tasks: state.tasks.map(task =>
      task.id === taskId ? { ...task, ...changes } : task
    )
  }))
);

export function taskReducer(state: TaskState | undefined, action: Action) {
  return _taskReducer(state, action);
}
