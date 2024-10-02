import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskProviderService } from './task-provider.service'; // Asegúrate de importar el servicio correcto

describe('TaskProviderService', () => {
  let service: TaskProviderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule para simular solicitudes HTTP
      providers: [TaskProviderService] // Provee el servicio TaskProviderService
    });

    // Inyecta las dependencias del servicio y el HttpTestingController
    service = TestBed.inject(TaskProviderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya solicitudes HTTP pendientes después de cada prueba
    httpMock.verify();
  });

  it('should retrieve tasks from the API via GET', () => {
    // Datos ficticios para simular la respuesta de la API
    const dummyTasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true }
    ];

    // Ejecuta el método getTasks del servicio
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2); // Comprueba que se reciban 2 tareas
      expect(tasks).toEqual(dummyTasks); // Comprueba que los datos coincidan con los datos ficticios
    });

    // Verifica que la solicitud se haya hecho a la URL correcta
    const request = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(request.request.method).toBe('GET'); // Asegúrate de que el método HTTP sea GET

    // Simula la respuesta de la API con los datos ficticios
    request.flush(dummyTasks);
  });
});
