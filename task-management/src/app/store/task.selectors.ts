import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('taskState');

// Seleccionar todas las tareas
export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

// Seleccionar tareas completadas
export const selectCompletedTasks = createSelector(
  selectAllTasks,
  tasks => tasks.filter(task => task.completed)
);

// Seleccionar tareas pendientes
export const selectPendingTasks = createSelector(
  selectAllTasks,
  tasks => tasks.filter(task => !task.completed)
);
