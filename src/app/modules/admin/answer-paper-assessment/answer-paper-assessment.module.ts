import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {answerPaperAssessmentRoutes} from "./answer-paper-assessment.routes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AnswerPaperAssessmentComponent} from "./components/answer-paper-assessment.component";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import { FindAnswerPaperComponent } from './components/find-answer-paper/find-answer-paper.component';
import {BadgeModule} from "primeng/badge";
import {AngularSplitModule} from "angular-split";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  imports: [
    RouterModule.forChild(answerPaperAssessmentRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    BadgeModule,
    AngularSplitModule,
    PdfViewerModule,
    InputTextModule,
  ],
  declarations: [
    AnswerPaperAssessmentComponent,
    FindAnswerPaperComponent,
  ]
})
export class AnswerPaperAssessmentModule {
}
