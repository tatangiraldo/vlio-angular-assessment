import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('taskState');

// Select all tasks
export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

// select completed tasks
export const selectCompletedTasks = createSelector(
  selectAllTasks,
  tasks => tasks.filter(task => task.completed)
);

// selecec pending tasks
export const selectPendingTasks = createSelector(
  selectAllTasks,
  tasks => tasks.filter(task => !task.completed)
);
