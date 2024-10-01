import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTask, updateTask, deleteTask, updatePersonInTask, addPersonToTask } from '../store/task.actions';
import { Person, Task } from '../models/task.model';
import { selectAllTasks } from '../store/task.selectors';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private store: Store) {}

  // Obtener todas las tareas
  getTasks(): Observable<Task[]> {
    return this.store.select(selectAllTasks);
  }

  // Añadir una nueva tarea
  addTask(newTask: Task) {
    this.store.dispatch(addTask({ task: newTask }));
  }

  // Actualizar una tarea
  updateTask(taskId: number, changes: Partial<Task>) {
    this.store.dispatch(updateTask({ taskId, changes }));
  }

  // Eliminar una tarea
  deleteTask(taskId: number) {
    this.store.dispatch(deleteTask({ taskId }));
  }

  // Método para actualizar una persona en una tarea
  updatePersonInTask(taskId: number, personName: string, changes: Partial<Person>) {
    debugger
    this.store.dispatch(updatePersonInTask({ taskId, personName, changes }));
  }

  // Método para añadir una persona a una tarea
  addPersonToTask(taskId: number, person: Person) {
    // Lógica para añadir una persona a una tarea específica
    this.store.dispatch(addPersonToTask({ taskId, person }));

  }

  // Método para eliminar una persona de una tarea
  removePersonFromTask(taskId: number, personName: string) {
    // Lógica para eliminar una persona de una tarea específica
    // Debes implementar la acción y el reducer correspondiente
  }
}
