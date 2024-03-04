import {NgModule} from '@angular/core';
import {StudentLoginComponent} from "./components/login/student-login.component";
import {RouterModule} from "@angular/router";
import {sudentRoutes} from "./student.routes";
import { ExamComponent } from './components/exam/exam.component';
import {HeaderComponent} from "../../header/header.component";
import {QuestionComponent} from "../../views/question/question.component";
import {QthumbnailComponent} from "../../views/qthumbnail/qthumbnail.component";
import {AngularSplitModule} from "angular-split";
import {FormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {SpreadSheetsModule} from "@mescius/spread-sheets-angular";
import {AuthModule} from "../auth/auth.module";
import { StudentHomeComponent } from './components/home/student-home.component';


@NgModule({
  declarations: [
    StudentLoginComponent,
    ExamComponent,
    HeaderComponent,
    QuestionComponent,
    QthumbnailComponent,
    StudentHomeComponent,

  ],
    imports: [
        [RouterModule.forChild(sudentRoutes)],
        AngularSplitModule,
        FormsModule,
        CKEditorModule,
        SpreadSheetsModule,
        AuthModule,
    ],
  providers: [],
  bootstrap: []
})
export class StudentModule {
}
