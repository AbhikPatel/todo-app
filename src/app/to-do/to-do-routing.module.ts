import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoContainerComponent } from './to-do-container/to-do-container.component';

const routes: Routes = [
  {
    path:'',
    component:ToDoContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDoRoutingModule { }
