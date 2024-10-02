
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Person, Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { addTask } from 'src/app/store/task.actions';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
})
export class PersonFormComponent implements OnInit{
  
  @Input() selectedPerson?: Person;
  personForm: FormGroup;
  personIndex = 0;
  localSkillList: string[] = [];
  showErrorMessage: string = ''

  constructor(private fBuilder: FormBuilder, 
              public activeModal: NgbActiveModal,
              private taskService: TaskService,
            ) {

    this.personForm = this.fBuilder.group({
      id: 0,
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      age: ['', Validators.required]
    });

  }

  ngOnInit() {
    if(this.selectedPerson){
      this.localSkillList = this.selectedPerson.skills;
      this.personForm.patchValue({
        id: this.selectedPerson.id,
        fullName: this.selectedPerson.fullName,
        age: this.selectedPerson.age,
        skills: this.selectedPerson.skills
      })
    }else{
      this.personForm.patchValue({
        id: Date.now(),
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
  submitForm(event?: Event) {
    if( this.localSkillList.length > 0 ){
      if (this.personForm.valid) {
        this.close({
                ... this.personForm.value,
                skills: this.localSkillList
              } );
        this.personForm.reset();
      }
    }else{
      this.showErrorMessage = 'You must add at least one skill';
    }
  }

  close(formValue?: any) {
    this.activeModal.close(this.personForm.value);
  }

  newSkillEmit(newSkill: any){
    if(newSkill.length > 0 && !this.localSkillList.some( (skill) => skill == newSkill )){
      let tmpList = [... this.localSkillList];
      tmpList.push(newSkill);
      this.localSkillList = [...tmpList]
    }
    
  }
}
