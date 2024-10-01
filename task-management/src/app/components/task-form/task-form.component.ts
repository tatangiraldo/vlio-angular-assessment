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
      taskName: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required],
      people: this.fBuilder.array([this.createPerson()])
    });
  }

  // People form
  createPerson(): FormGroup {
    return this.fBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fBuilder.array([this.createSkill()])
    });
  }

  // Register form to skills
  createSkill(): FormGroup {
    return this.fBuilder.group({
      skillName: ['', Validators.required]
    });
  }

  // Get all people
  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  // Add person
  addPerson() {
    debugger
    this.people.push(this.createPerson());
  }

  // Delete person
  removePerson(index: number) {
    debugger
    this.people.removeAt(index);
  }

  // Get skills
  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  // add person's skill
  addSkill(personIndex: number) {
    debugger
    this.getSkills(personIndex).push(this.createSkill());
  }

  // remove person's skill
  removeSkill(personIndex: number, skillIndex: number) {
    debugger
    this.getSkills(personIndex).removeAt(skillIndex);
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

  close() {
    this.activeModal.close(); // Cerrar el modal
  }
}
