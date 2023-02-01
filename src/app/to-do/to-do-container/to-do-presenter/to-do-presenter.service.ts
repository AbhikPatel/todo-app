import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { todoModel } from '../../todo.model';

@Injectable()

export class ToDoPresenterService {

  private todosData:Subject<todoModel>;
  public todosData$:Observable<todoModel>;

  private updatedTodo:Subject<todoModel>;
  public updatedTodo$:Observable<todoModel>;

  constructor(
    private _fb:FormBuilder
  ) {
    this.todosData = new Subject();
    this.todosData$ = new Observable();
    this.todosData$ = this.todosData.asObservable();

    this.updatedTodo = new Subject();
    this.updatedTodo$ = new Observable();
    this.updatedTodo$ = this.updatedTodo.asObservable();
  }

  /**
   * @name getGroup
   * @returns Formcontrols
   */
  public getGroup(){
    return this._fb.group({
      name:['',[Validators.required, Validators.pattern(`[a-z][A-Z][0-9]`)]],
      status:[''],
    })
  }

  /**
   * @name getData
   * @param data 
   * @description Getting the data of recently added todo
   */
  public getData(data:any){
    let todo = { status:false }
    this.todosData.next(Object.assign(data,todo))
  }

  public getUpdateData(data:any){
    this.updatedTodo.next(data)
  }
}
