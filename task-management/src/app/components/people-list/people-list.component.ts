import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/models/task.model';
import { PersonFormComponent } from '../person-form/person-form.component';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent {

  constructor( private modalService: NgbModal){}

  @Input() peopleList?: Person[] = []

  // Open person modal
  handlePerson(person: Person){

    const modalRef = this.modalService.open(PersonFormComponent);
    modalRef.componentInstance.selectedPerson = person;
    modalRef.componentInstance.close = () => {
      modalRef.close();
    };
  }
}
