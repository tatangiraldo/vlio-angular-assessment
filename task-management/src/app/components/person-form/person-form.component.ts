
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Person, Task } from 'src/app/models/task.model';
import { addTask } from 'src/app/store/task.actions';



@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit{
  
  @Input() selectedPerson?: Person;
  personForm: FormGroup;
  personIndex = 0;
  localSkillList: string[] = [];

  constructor(private fBuilder: FormBuilder, 
              private store: Store, 
              public activeModal: NgbActiveModal ) {

    this.personForm = this.fBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      age: ['', Validators.required],
      skills: []
    });

  }

  ngOnInit() {
    if(this.selectedPerson){
      this.localSkillList = this.selectedPerson.skills;
      this.personForm.patchValue({
        fullName: this.selectedPerson.fullName,
        age: this.selectedPerson.age,
        skills: this.selectedPerson.skills
      })    
    }
  }

  // remove person's skill
  removeSkill(skill: any) {
    this.localSkillList = this.localSkillList.filter(sk => sk !== skill);
    this.personForm.patchValue({
      skills: this.localSkillList
    })
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


}
