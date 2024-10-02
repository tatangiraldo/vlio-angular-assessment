import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskProviderService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  //Get tasks from api.   It returns directly the observable to use Async pipe
  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
