import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-skill-input',
  templateUrl: './skill-input.component.html',
})
export class SkillInputComponent {

  @Output() newSkillEmit = new EventEmitter<string>();

  newSkill: string = '';

  addSkill() {    
    this.newSkillEmit.emit(this.newSkill.trim().toLocaleLowerCase());
    this.newSkill = '';    
  }
}
