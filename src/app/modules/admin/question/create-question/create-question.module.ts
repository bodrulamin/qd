import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {createQuestionRoute} from "./create-question.route";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CreateQuestionComponent} from "./components/create-question.component";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";

@NgModule({
  imports: [
    RouterModule.forChild(createQuestionRoute),
    ReactiveFormsModule,
    CommonModule,
    DropdownModule,
    ButtonModule
  ],
  declarations: [
    CreateQuestionComponent,
  ]
})
export class CreateQuestionModule {
}
