import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {lockQuestionRoutes} from "./lock-question.routes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LockQuestionComponent} from "./components/lock-question.component";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";

@NgModule({
  imports: [
    RouterModule.forChild(lockQuestionRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    InputTextModule,
    PasswordModule
  ],
  exports: [
    LockQuestionComponent
  ],
  declarations: [
    LockQuestionComponent,
  ]
})
export class LockQuestionModule {
}
