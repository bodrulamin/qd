import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {unlockQuestionRoutes} from "./unlock-question.routes";
import {LockUnlockTemplateModule} from "../lock-unlock-template/lock-unlock-template.module";
import {UnlockQuestionComponent} from "./components/unlock-question.component";

@NgModule({
  imports: [
    RouterModule.forChild(unlockQuestionRoutes),
    LockUnlockTemplateModule,
  ],
  declarations: [
    UnlockQuestionComponent
  ]
})
export class UnlockQuestionModule {
}
