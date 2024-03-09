import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {SubjectConfigurationComponent} from "./components/subject-configuration.component";
import {subjectConfigRoute} from "./subject-config.route";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  imports: [
    RouterModule.forChild(subjectConfigRoute),
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    InputTextModule
  ],
  declarations: [
    SubjectConfigurationComponent
  ]
})
export class SubjectConfigModule {
}
