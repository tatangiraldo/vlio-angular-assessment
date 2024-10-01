import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';
import { addTask } from 'src/app/store/task.actions';



@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  
  taskForm: FormGroup;

  constructor(private fBuilder: FormBuilder, private store: Store, public activeModal: NgbActiveModal ) {
    
    this.taskForm = this.fBuilder.group({
      taskName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      dueDate: ['', Validators.required],
    });
    
  }

  //Set date from datepicker
  onDateSelect = (event: any) => {
    this.taskForm.patchValue({
      dueDate: `${event.year}-${event.month}-${event.day}`,
    });
  }

  // Execute form
  submitForm() {
    debugger
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        id: Date.now(),
        completed: false
      };
      this.store.dispatch(addTask({ task: newTask }));
      this.taskForm.reset();
      this.close();
    }
  }

  //Close modal
  close() {
    this.activeModal.close();
  }
}
