import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskProviderService } from './task-provider.service';

describe('TaskProviderService', () => {
  let service: TaskProviderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskProviderService]
    });
    service = TestBed.inject(TaskProviderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve tasks from the API via GET', () => {
    const dummyTasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true }
    ];
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const request = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(request.request.method).toBe('GET');

    request.flush(dummyTasks);
  });
});
