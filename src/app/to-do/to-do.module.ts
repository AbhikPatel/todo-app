import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoContainerComponent } from './to-do-container/to-do-container.component';
import { ToDoPresentationComponent } from './to-do-container/to-do-presentation/to-do-presentation.component';
import { LogicService } from './logic.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ToDoContainerComponent,
    ToDoPresentationComponent
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    FormsModule
  ],
  providers:[
    LogicService
  ]
})
export class ToDoModule { }
