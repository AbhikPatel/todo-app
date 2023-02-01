import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { todoModel } from './todo.model';

@Injectable()

export class LogicService {

  public todos:any[]
  public todosSubject:BehaviorSubject<todoModel[]>

  constructor() {
    let getData:any = localStorage.getItem('todos')
    getData ? this.todos = JSON.parse(getData) : this.todos = [];
    this.todosSubject = new BehaviorSubject(this.todos)
  }
}
