import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/models/task.model';
import { PersonFormComponent } from '../person-form/person-form.component';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit{

  @Input() peopleList?: Person[] = [];
  @Output() handlePeople = new EventEmitter<Person>();


  constructor( private modalService: NgbModal){}

  ngOnInit(): void {
    /*if( this.peopleList && this.peopleList?.length > 0 ){
      this.localPeopleList = this.peopleList;
    }*/
  }


  // Open person modal
  handlePerson(person?: Person){

    const modalRef = this.modalService.open(PersonFormComponent);
    modalRef.componentInstance.selectedPerson = person;

    // Get data from modal when it is closed
    modalRef.componentInstance.close = (personFromModal?: Person) => {

      if(personFromModal){

        /*let objCopy = this.peopleList;

        const personExists = objCopy?.some(person => person.id === personFromModal.id);
        if(personExists){
          objCopy = objCopy?.map(person => {
            if (person.id === personFromModal.id) {
              return { 
                ...person,
                skills: [... personFromModal.skills]
              }; 
            }
            return person;
          });

        }else{
          objCopy?.push(personFromModal);
        }        

        this.peopleList = objCopy;*/
        this.handlePeople.emit(personFromModal);
      }
      modalRef.close();
    };


  }
}
