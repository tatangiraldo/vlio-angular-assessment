import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

// Acción para agregar una tarea
export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

// Acción para eliminar una tarea
export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ taskId: number }>()
);

// Acción para actualizar una tarea (marcar completada o pendiente)
export const updateTask = createAction(
  '[Task] Update Task',
  props<{ taskId: number, changes: Partial<Task> }>()
);
