import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/models/task.model';
import { PersonFormComponent } from '../person-form/person-form.component';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
})
export class PeopleListComponent {

  @Input() peopleList?: Person[] = [];
  @Output() handlePeople = new EventEmitter<Person>();
  @Output() removePersonEmit = new EventEmitter<Person>();
  editMode: boolean = false;
  showErrorMessage: string = ''

  constructor( private modalService: NgbModal){}

  removePerson(person?: Person){
    this.removePersonEmit.emit(person);
  }

  // Open person modal
  handlePerson(person?: Person){

    this.editMode = (person) ? true : false;

    const modalRef = this.modalService.open(PersonFormComponent);
    modalRef.componentInstance.selectedPerson = person;

    // Get data from modal when it is closed
    modalRef.componentInstance.close = (personFromModal?: Person) => {

      if(personFromModal){

        const personExists = this.peopleList?.some(
            p => p.fullName.toLocaleLowerCase().trim() === personFromModal.fullName.toLocaleLowerCase().trim());
            
        if(personExists && !this.editMode){
          this.showErrorMessage = 'Person already exist';
        }else{
          this.handlePeople.emit(personFromModal);
        }        
      }
      modalRef.close();
    };
  }
}
