import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { deleteTask, updateTask } from 'src/app/store/task.actions';
import { selectAllTasks } from 'src/app/store/task.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskFormComponent } from '../task-form/task-form.component';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;

  constructor(private store: Store, private modalService: NgbModal) {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  // Set task as completed
  toggleTaskCompletion(task: Task) {
    this.store.dispatch(updateTask({ taskId: task.id, changes: { completed: !task.completed } }));
  }

  // Delete task
  deleteTask(taskId: number) {
    this.store.dispatch(deleteTask({ taskId }));
  }


  // Método para abrir el modal de nueva tarea
  openNewTaskForm() {
    const modalRef = this.modalService.open(TaskFormComponent);
    modalRef.componentInstance.close = () => {
      modalRef.close();
    };
  }

  closeTaskModal() {
    debugger
  }
}
