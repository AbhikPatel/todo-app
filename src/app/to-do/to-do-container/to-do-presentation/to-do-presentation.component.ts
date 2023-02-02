import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { todoModel } from '../../todo.model';
import { ToDoPresenterService } from '../to-do-presenter/to-do-presenter.service';

@Component({
  selector: 'app-to-do-presentation',
  templateUrl: './to-do-presentation.component.html',
  viewProviders: [ToDoPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoPresentationComponent implements OnInit {

  // Getting value of todos 
  @Input() public set todo(v: todoModel[] | null) {
    this._todo = v;
  }
  public get todo(): todoModel[] | null {
    return this._todo;
  }

  // Emitting the value of recently added todo 
  @Output() public emitTodoData: EventEmitter<todoModel>;
  @Output() public emitUpdateTodo: EventEmitter<todoModel>;
  @Output() public emitClearComplete: EventEmitter<boolean>;

  private _todo: todoModel[] | null;

  public inputText: any;
  public current: number;
  public todosLeftCount: number;
  public hoverEffect: any;
  public todoGroup: FormGroup;
  public deleteMode: boolean;
  public darkMode: any;
  public copyData: any;

  constructor(
    private _service: ToDoPresenterService
  ) {
    this.todoGroup = this._service.getGroup();
    this._todo = [];
    this.emitTodoData = new EventEmitter();
    this.emitUpdateTodo = new EventEmitter();
    this.emitClearComplete = new EventEmitter();
    this.deleteMode = false;
    this.copyData = [];
    this.current = 1;
    this.hoverEffect = null;
    this.todosLeftCount = 0;
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method is called in ngOnInit
  */
  public props() {
    let theme: any = localStorage.getItem('theme')
    this.darkMode = JSON.parse(theme)

    this.copyData = this.todo;
    this._service.todosData$.subscribe((data) => this.emitTodoData.emit(data))
    this._service.updatedTodo$.subscribe((data) => this.emitUpdateTodo.emit(data))

    this.remaining();
  }

  /**
   * @name onSubmit
   * @description This method is called when the form data is submitted
   */
  public onSubmit() {
    if (this.todoGroup.valid) {
      let data = this._todo?.find((items) => items.name === this.todoGroup.value.name)
      data ? alert('This todo is already added') : this._service.getData(this.todoGroup.value)
      this.todoGroup.reset();
    }
    this.current = 1;
    this.remaining();
  }

  /**
   * @name onTodo
   * @param todo 
   * @description This method will make todo complete
   */
  public onTodo(todo: todoModel) {
    if (this.current === 1) {
      todo.status ? todo.status = false : todo.status = true;
      this._service.getUpdateData(todo)
    }
    this.remaining();
  }

  /**
   * @name onDel
   * @param todo
   * @description To delete a todo 
   */
  public onDel(todo: todoModel) {
    this._service.getData(todo)
    this.current = 1;
    this.remaining();
  }

  public onShow(id: number) {
    if (id === 2) {
      this.copyData = this.todo?.filter((items) => items.status === false);
      this.current = 2;
    }

    if (id === 3) {
      this.copyData = this.todo?.filter((items) => items.status === true);
      this.current = 3;
    }

    if (id === 1) {
      this.copyData = this.todo;
      this.current = 1;
    }
  }

  public onClear() {
    this.emitClearComplete.emit(true);
    this.current = 1;
    this.copyData = this.todo?.filter((items) => items.status === false)
  }

  public onMode() {
    this.darkMode ? this.darkMode = false : this.darkMode = true;
    let data = JSON.stringify(this.darkMode)
    localStorage.setItem('theme', data)
  }

  public get getControls() {
    return this.todoGroup['controls']
  }

  public onEnter(data: todoModel) {
    this.hoverEffect = data.name;
  }

  public onOut() {
    this.hoverEffect = null;
  }

  public remaining() {
    let lefttodo = this.todo?.filter((items) => items.status === false);
    if (lefttodo)
      this.todosLeftCount = lefttodo.length
  }

  public setThemeImage(){
    return this.darkMode ?  'assets/images/icon-sun.svg' : 'assets/images/icon-moon.svg'
  }
}
