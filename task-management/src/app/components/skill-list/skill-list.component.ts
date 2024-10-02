import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/models/task.model';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
})
export class SkillListComponent implements OnInit {
    
  @Input() skills?: any;
  @Input() ableToRemove?: boolean = false;
  tooltipMss: string = '';

  @Output() removeSkillEvent = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.tooltipMss = (this.ableToRemove) ? 'Remove' : 'Click to check';
  }

  removeSkill(skill: any) {
    this.removeSkillEvent.emit(skill);
  }
}
