import { createAction, props } from '@ngrx/store';
import { Person, Task } from '../models/task.model';

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ taskId: number; changes: Partial<Task> }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ taskId: number }>()
);

export const addPersonToTask = createAction(
  '[Task] Add Person to Task',
  props<{ taskId: number; person: Person }>()
);

export const removePersonFromTask = createAction(
  '[Task] Remove Person from Task',
  props<{ taskId: number; personName: string }>()
);

export const updatePersonInTask = createAction(
  '[Task] Update Person in Task',
  props<{ taskId: number; personName: string; changes: Partial<Person> }>()
);

