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
import { SkillInputComponent } from './skill-input/skill-input.component';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TaskListComponent,
    PeopleListComponent,
    PersonFormComponent,
    SkillListComponent,
    SkillInputComponent,
    AlertComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ taskState: taskReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // savee 25 lastest states
    }),
    NgbModule,
    FormsModule,
    NgbDatepickerModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
