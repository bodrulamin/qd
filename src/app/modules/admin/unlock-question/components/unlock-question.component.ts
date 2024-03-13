import {Component} from '@angular/core';
import {BaseComponent} from "../../../base/components/base-component/base.component";

@Component({
  selector: 'app-unlock-q',
  templateUrl: './unlock-question.component.html',
})
export class UnlockQuestionComponent extends BaseComponent {
  header = 'Student Login';
  constructor(

  ) {
    super();
    this.header = 'Unlock Question'
  }


}
