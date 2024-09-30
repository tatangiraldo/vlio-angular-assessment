import { Action, createReducer, on } from '@ngrx/store';
import { addTask, deleteTask, updateTask } from './task.actions';
import { Task } from '../models/task.model';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: []
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
