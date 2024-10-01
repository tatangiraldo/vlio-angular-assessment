import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './store/task.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { SkillListComponent } from './components/skill-list/skill-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TaskListComponent,
    PeopleListComponent,
    PersonFormComponent,
    SkillListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ taskState: taskReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retiene los últimos 25 estados
    }),
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
