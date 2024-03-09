import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {examConfigRoute} from "./exam-config.route";
import {ExamConfigurationComponent} from "./components/exam-configuration.component";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {PasswordModule} from "primeng/password";
import {TableModule} from "primeng/table";
import {MenuModule} from "primeng/menu";
import {DialogModule} from "primeng/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  imports: [
    RouterModule.forChild(examConfigRoute),
    DropdownModule,
    CalendarModule,
    PasswordModule,
    TableModule,
    MenuModule,
    DialogModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule
  ],
  declarations: [
    ExamConfigurationComponent,
  ]
})
export class ExamConfigModule {
}
