import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from 'src/app/models/task.model';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent {

  @Input() skills?: any;

  @Output() removeSkillEvent = new EventEmitter<string>();

  removeSkill(skill: any) {
    this.removeSkillEvent.emit(skill);
  }
}
