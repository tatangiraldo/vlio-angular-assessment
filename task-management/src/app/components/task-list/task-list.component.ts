import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { deleteTask, updateTask } from 'src/app/store/task.actions';
import { selectAllTasks, selectCompletedTasks, selectPendingTasks } from 'src/app/store/task.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;

  states = {
    all: 'all',
    completed: 'completed',
    pending: 'pending'
  }

  constructor(
      private store: Store, 
      private modalService: NgbModal) {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  // Set task as completed
  toggleTaskCompletion(task: Task) {
    this.store.dispatch(updateTask({ taskId: task.id, changes: { completed: !task.completed } }));
  }

  // Delete task
  deleteTask(task: Task) {
    this.store.dispatch(deleteTask({ taskId : task.id}));
  }

  openConfirm(task: Task) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    
    modalRef.componentInstance.message = `¿Remove task ${task.taskName} ?`

    modalRef.result.then(
      (result) => {
        debugger
        if (result === 'confirm') {
          this.deleteTask(task);
        }
      },
      (reason) => {}
    );
  }

  // Open new task modal
  openNewTaskForm(selectedTask?: Task ) {
    const modalRef = this.modalService.open(TaskFormComponent);
    modalRef.componentInstance.selectedTask = selectedTask;
    modalRef.componentInstance.close = () => {
      modalRef.close();
    };
  }

  onChange(event: any) {
    switch (event.target.value) {
      case this.states.completed:
        this.tasks$ = this.store.select(selectCompletedTasks);        
        break;
      case this.states.pending:
        this.tasks$ = this.store.select(selectPendingTasks);
        break
      default:
        this.tasks$ = this.store.select(selectAllTasks);
        break;
    }
  }

  closeTaskModal() {
    debugger
  }
}
