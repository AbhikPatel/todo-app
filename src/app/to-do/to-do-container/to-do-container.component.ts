import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LogicService } from '../logic.service';
import { todoModel } from '../todo.model';

@Component({
  selector: 'app-to-do-container',
  templateUrl: './to-do-container.component.html'
})
export class ToDoContainerComponent implements OnInit {

  public getTodos: Observable<todoModel[]>
  constructor(
    private _service: LogicService
  ) {
    this.getTodos = new Observable();
  }

  ngOnInit(): void {
    this.getTodos = this._service.todosSubject.asObservable();
  }
  
  public emitTodoData(todo: todoModel) {
    let todosArray = this._service.todos;
    let findData = todosArray.find((items) => items === todo)
    findData ? todosArray.splice(todosArray.indexOf(findData), 1) : todosArray.push(todo);
    this.storeInLocalStorage();
  }
  
  public emitUpdateTodo(todo: todoModel) {
    if (todo.status === false) {
      let findData = this._service.todos.find((items) => items === todo)
      this._service.todos.splice(this._service.todos.indexOf(findData), 1, todo);
    }
    this.storeInLocalStorage();
  }
  
  public emitClearComplete(data:boolean){
    this._service.todos = this._service.todos.filter((items) => items.status === false)
    this._service.todosSubject.next(this._service.todos)
    this.storeInLocalStorage();
  }
  
  public storeInLocalStorage() {
    let todosArray = this._service.todos;
    let stringFormat = JSON.stringify(todosArray);
    this.getTodos = this._service.todosSubject.asObservable();
    localStorage.setItem('todos', stringFormat);
  }

}
