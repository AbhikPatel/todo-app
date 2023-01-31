import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToDoPresenterService } from '../to-do-presenter/to-do-presenter.service';

@Component({
  selector: 'app-to-do-presentation',
  templateUrl: './to-do-presentation.component.html',
  viewProviders:[ToDoPresenterService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ToDoPresentationComponent implements OnInit {

  constructor(
    private _service: ToDoPresenterService
  ) { }

  ngOnInit(): void {
  }

}
