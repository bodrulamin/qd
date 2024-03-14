import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {lockQuestionRoutes} from "./lock-question.routes";
import {LockQuestionComponent} from "./components/lock-question.component";
import {LockUnlockTemplateModule} from "../lock-unlock-template/lock-unlock-template.module";

@NgModule({
  imports: [
    RouterModule.forChild(lockQuestionRoutes),
    LockUnlockTemplateModule,
  ],
  exports: [
  ],
  declarations: [
    LockQuestionComponent
  ]
})
export class LockQuestionModule {
}
