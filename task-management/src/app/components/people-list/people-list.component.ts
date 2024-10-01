import { Component, Input } from '@angular/core';
import { Person } from 'src/app/models/task.model';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent {

  @Input() peopleList?: Person[] = []

}
