import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {examSchedulingRoutes} from "./exam-scheduling.routes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ExamSchedulingComponent} from "./components/exam-scheduling.component";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";

@NgModule({
  imports: [
    RouterModule.forChild(examSchedulingRoutes),
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
  declarations: [
    ExamSchedulingComponent,
  ]
})
export class ExamSchedulingModule {
}
