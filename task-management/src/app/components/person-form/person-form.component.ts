
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';
import { addTask } from 'src/app/store/task.actions';



@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  
  personForm: FormGroup;
  personIndex = 0;

  constructor(private fBuilder: FormBuilder, private store: Store, public activeModal: NgbActiveModal ) {
    this.personForm = this.fBuilder.group({
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
    return this.personForm.get('people') as FormArray;
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
  getSkills(): FormArray {
    return this.people.at(this.personIndex).get('skills') as FormArray;
  }

  // add person's skill
  addSkill() {
    debugger
    this.getSkills().push(this.createSkill());
  }

  // remove person's skill
  removeSkill(skillIndex: number) {
    debugger
    this.getSkills().removeAt(skillIndex);
  }

  // Execute form
  submitForm() {
    debugger

    if (this.personForm.valid) {
      const newTask: Task = {
        ...this.personForm.value,
        id: Date.now(),
        completed: false
      };
      this.store.dispatch(addTask({ task: newTask }));
      this.personForm.reset();
      this.close();
    }
  }

  close() {
    this.activeModal.close(); // Cerrar el modal
  }
}
