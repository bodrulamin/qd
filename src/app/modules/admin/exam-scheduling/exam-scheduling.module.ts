import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {examSchedulingRoutes} from "./exam-scheduling.routes";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ExamSchedulingComponent} from "./components/exam-scheduling.component";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {CalendarModule} from "primeng/calendar";

@NgModule({
  imports: [
    RouterModule.forChild(examSchedulingRoutes),
    ReactiveFormsModule,
    CommonModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    CalendarModule
  ],
  declarations: [
    ExamSchedulingComponent,
  ]
})
export class ExamSchedulingModule {
}
