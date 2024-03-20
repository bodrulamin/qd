import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamPaperComponent} from "./components/exam-paper.component";
import {RouterModule} from "@angular/router";
import {BadgeModule} from "primeng/badge";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {AngularSplitModule} from "angular-split";
import {ScientificCalculatorComponent} from './components/scientific-calculator/scientific-calculator.component';
import {DialogModule} from "primeng/dialog";
import {ToggleButtonModule} from "primeng/togglebutton";
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    ExamPaperComponent,
    ScientificCalculatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ExamPaperComponent}
    ]),
    FormsModule,
    BadgeModule,
    PdfViewerModule,
    ButtonModule,
    AngularSplitModule,
    DialogModule,
    ToggleButtonModule,
    EditorModule,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class ExamPaperModule {
}
