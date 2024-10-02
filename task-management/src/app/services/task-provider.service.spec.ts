import { TestBed } from '@angular/core/testing';

import { TaskProviderService } from './task-provider.service';

describe('TaskProviderService', () => {
  let service: TaskProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
