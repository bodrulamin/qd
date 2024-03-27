import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {assignExaminerRoutes} from "./assign-examiner.routes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AssignExaminerComponent} from "./components/assign-examiner.component";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {UserLookupTemplateModule} from "../user-lookup-template/user-lookup-template.module";
import {MenuModule} from "primeng/menu";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {TagModule} from "primeng/tag";
import {BadgeModule} from "primeng/badge";

@NgModule({
  imports: [
    RouterModule.forChild(assignExaminerRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    DialogModule,
    UserLookupTemplateModule,
    MenuModule,
    InputTextModule,
    KeyFilterModule,
    BadgeModule,
  ],
  declarations: [
    AssignExaminerComponent,
  ]
})
export class AssignExaminerModule {
}
