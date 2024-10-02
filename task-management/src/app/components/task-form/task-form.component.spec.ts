import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TaskFormComponent } from './task-form.component';
import { addTask, updateTask } from '../../store/task.actions';
import { Task } from '../../models/task.model';
import { NgbModalModule, NgbActiveModal, NgbDatepickerModule  } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeopleListComponent } from '../people-list/people-list.component';


describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let store: MockStore;
  const initialState = { tasks: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent, PeopleListComponent],
      providers: [
        provideMockStore({ initialState }),
        NgbModalModule,
        NgbActiveModal,
        NgbDatepickerModule 
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('this must dispatch action addTask when addTask method is executed', () => {
    debugger;
    const newTask: Task = { 
      id: 1, 
      taskName: 'New Task', 
      completed: false, 
      people: [],
      dueDate: {
        day: 31,
        month: 12,
        year: 2024
      }
    };
    component.addTask(newTask);
    expect(store.dispatch).toHaveBeenCalledWith(addTask({ task: newTask }));
  });

  it('this must dispatch action updateTask when updateTask mthod is executed', () => {
    const task: Task = { 
      id: 1, 
      taskName: 'New Task', 
      completed: false, 
      people: [],
      dueDate: {
        day: 31,
        month: 12,
        year: 2024
      }
    };

    component.updateTask(task);

    expect(store.dispatch).toHaveBeenCalledWith(updateTask({ taskId: task.id, changes: task }));
  });
});
