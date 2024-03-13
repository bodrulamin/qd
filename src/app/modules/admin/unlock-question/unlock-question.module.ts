import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {UnlockQuestionComponent} from "./components/unlock-question.component";
import {unlockQuestionRoutes} from "./unlock-question.routes";
import {LockQuestionModule} from "../lock-question/lock-question.module";

@NgModule({
  imports: [
    RouterModule.forChild(unlockQuestionRoutes),
    LockQuestionModule,
  ],
  declarations: [
    UnlockQuestionComponent
  ]
})
export class UnlockQuestionModule {
}
