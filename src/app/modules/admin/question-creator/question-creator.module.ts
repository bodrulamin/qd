import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {questionCreatorRoutes} from "./question-creator.routes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {QuestionCreatorComponent} from "./components/question-creator.component";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {TagModule} from "primeng/tag";
import {DialogModule} from "primeng/dialog";
import {UserLookupTemplateModule} from "../user-lookup-template/user-lookup-template.module";

@NgModule({
    imports: [
        RouterModule.forChild(questionCreatorRoutes),
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ButtonModule,
        TableModule,
        DropdownModule,
        TagModule,
        DialogModule,
        UserLookupTemplateModule,
        CalendarModule,
    ],
  declarations: [
    QuestionCreatorComponent,
  ]
})
export class QuestionCreatorModule {
}
