import {NgModule} from '@angular/core';
import {StudentLoginComponent} from "./components/student-login/student-login.component";
import {RouterModule} from "@angular/router";
import {sudentRoutes} from "./student.routes";
import { ExamComponent } from './components/exam/exam.component';
import {HeaderComponent} from "../../header/header.component";
import {QuestionComponent} from "../../views/question/question.component";
import {QthumbnailComponent} from "../../views/qthumbnail/qthumbnail.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {AngularSplitModule} from "angular-split";
import {FormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";


@NgModule({
  declarations: [
    StudentLoginComponent,
    ExamComponent,
    HeaderComponent,
    QuestionComponent,
    QthumbnailComponent,

  ],
  imports: [
    [RouterModule.forChild(sudentRoutes)],
    AngularSplitModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: []
})
export class StudentModule {
}
