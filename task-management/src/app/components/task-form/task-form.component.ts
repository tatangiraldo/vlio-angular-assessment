import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';
import { addTask, updateTask } from 'src/app/store/task.actions';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  
  @Input() selectedTask: Task = new Task();
  taskForm: FormGroup;
  editMode: boolean = false;

  //today = inject(NgbCalendar).getToday();

  constructor(  private fBuilder: FormBuilder, 
                private store: Store, 
                public activeModal: NgbActiveModal ) {
  
    this.taskForm = this.fBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      dueDate: ['', Validators.required],
    });

  }

  ngOnInit() {
    if(this.selectedTask){      
      this.taskForm.patchValue({
        title: this.selectedTask.title,
        dueDate: this.selectedTask.dueDate
      })
      this.editMode = true;
    }else{
      this.selectedTask = (this.selectedTask) ? this.selectedTask : new Task();
    }
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
        id: this.selectedTask.id,
        completed: false,
        people: this.selectedTask.people
      };

      if( this.editMode ){
        this.updateTask(newTask);
      }else{
        this.addTask(newTask);
      }
      this.taskForm.reset();
      this.close();      
    }
  }

  addTask(task: Task): void {
    this.store.dispatch(addTask({ task }));
  }

  updateTask(task: Task): void {
    this.store.dispatch(updateTask({ taskId: task.id, changes: task }));
  }
  
  //Close modal
  close() {
    this.activeModal.close();
  }

  handlePeopleList(person?: any){
    if(person){
      let tmpList = [... this.selectedTask?.people ?? []]

      debugger
      const personExists = tmpList?.some(p => p.id === person.id);
      if(personExists){
        tmpList = tmpList?.map(p => {
          if (p.id === person.id) {
            return { 
              ...p,
              skills: [... person.skills]
            }; 
          }
          return p;
        });
      }else{
        tmpList.push(person);
      }

      //Extend property to have fresh values
      this.selectedTask = {
        ...this.selectedTask, 
        people: [...tmpList]
      };
    }
  }
}
