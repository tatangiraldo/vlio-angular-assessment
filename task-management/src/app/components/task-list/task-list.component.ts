import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { deleteTask, updateTask } from 'src/app/store/task.actions';
import { selectAllTasks } from 'src/app/store/task.selectors';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;

  constructor(private store: Store) {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  // Método para marcar una tarea como completada
  toggleTaskCompletion(task: Task) {
    this.store.dispatch(updateTask({ taskId: task.id, changes: { completed: !task.completed } }));
  }

  // Método para eliminar una tarea
  deleteTask(taskId: number) {
    this.store.dispatch(deleteTask({ taskId }));
  }
}
