import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { deleteTask, updateTask } from 'src/app/store/task.actions';
import { selectAllTasks, selectCompletedTasks, selectPendingTasks } from 'src/app/store/task.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { TaskProviderService } from 'src/app/services/task-provider.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent {

  tasks$: Observable<Task[]>;
  tasksFromApi: boolean = false;

  stateSelected: string = '';
  states = {
    all: 'all',
    completed: 'completed',
    pending: 'pending'
  }

  constructor(
      private store: Store, 
      private modalService: NgbModal,
      private taskProviderService: TaskProviderService) {
    
        this.tasks$ = this.store.select(selectAllTasks);
        this.stateSelected = this.states.all;
  }

  // Set task as completed
  toggleTaskCompletion(task: Task) {
    if(this.tasksFromApi){
      return;
    }
    this.store.dispatch(updateTask({ taskId: task.id, changes: { completed: !task.completed } }));
  }

  //Get tasks from api:
  getTaskApi(){
    //  Debug line to inspect data structure
    /*this.taskProviderService.getTasks().subscribe((data) => {
      this.tasks$ = data;
    });*/

    this.tasks$ = this.taskProviderService.getTasks();
    this.tasksFromApi = true;
  }

  //Get data from store:
  getTaskStore(){
    this.tasks$ = this.store.select(selectAllTasks);
    this.tasksFromApi = false;
  }

  // Delete task
  deleteTask(task: Task) {
    this.store.dispatch(deleteTask({ taskId : task.id}));
  }

  openConfirm(task: Task) {

    if(this.tasksFromApi){
      return;
    }

    const modalRef = this.modalService.open(ConfirmModalComponent);
    
    modalRef.componentInstance.message = `¿Remove task ${task.title} ?`

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

    if(this.tasksFromApi){
      return;
    }

    const modalRef = this.modalService.open(TaskFormComponent);
    modalRef.componentInstance.selectedTask = selectedTask;
    modalRef.componentInstance.close = () => {
      modalRef.close();
    };
  }

  filterByStatus(state: any) {
    if(state.length > 0)
      this.stateSelected = state;
      switch (state) {
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

}
