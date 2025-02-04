import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TaskListComponent } from './task-list.component';
import { deleteTask } from '../../store/task.actions';
import { Task } from 'src/app/models/task.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModule

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore;
  const initialState = { tasks: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [HttpClientModule, NgbModule],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('it should execute deleteTask', () => {
    
    const newTask: Task = { 
      id: 1, 
      title: 'New Task', 
      completed: false, 
      people: [],
      dueDate: {
        day: 31,
        month: 12,
        year: 2024
      }
    };

    component.deleteTask(newTask);

    expect(store.dispatch).toHaveBeenCalledWith(deleteTask({ taskId: newTask.id }));
  });
});
