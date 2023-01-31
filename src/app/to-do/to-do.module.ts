import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoContainerComponent } from './to-do-container/to-do-container.component';
import { ToDoPresentationComponent } from './to-do-container/to-do-presentation/to-do-presentation.component';
import { LogicService } from './logic.service';


@NgModule({
  declarations: [
    ToDoContainerComponent,
    ToDoPresentationComponent
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule
  ],
  providers:[
    LogicService
  ]
})
export class ToDoModule { }
