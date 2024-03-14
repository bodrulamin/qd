import {Component} from '@angular/core';
import {BaseComponent} from "../../../base/components/base-component/base.component";

@Component({
  selector: 'app-unlock-q',
  templateUrl: './lock-question.component.html',
})
export class LockQuestionComponent extends BaseComponent {
  header = 'Lock Question';
  actionCode = 'LOCK';
  constructor() {
    super();
  }


}
