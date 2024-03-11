import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {scheduleExamRoute} from "./schedule-exam.route";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ScheduleExamComponent} from "./components/schedule-exam.component";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";

@NgModule({
  imports: [
    RouterModule.forChild(scheduleExamRoute),
    ReactiveFormsModule,
    CommonModule,
    DropdownModule,
    ButtonModule
  ],
  declarations: [
    ScheduleExamComponent,
  ]
})
export class ScheduleExamModule {
}
