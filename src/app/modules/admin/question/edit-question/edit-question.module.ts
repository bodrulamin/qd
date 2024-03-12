import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {editQuestionRoute} from "./edit-question.route";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {EditQuestionComponent} from "./components/edit-question.component";
import {SplitterModule} from "primeng/splitter";
import {EditorModule} from "primeng/editor";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";


@NgModule({
  imports: [
    RouterModule.forChild(editQuestionRoute),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    SplitterModule,
    EditorModule,
    CardModule,
    InputTextModule,
    DialogModule,
    FileUploadModule
  ],
  declarations: [
    EditQuestionComponent
  ]
})
export class EditQuestionModule {
}
