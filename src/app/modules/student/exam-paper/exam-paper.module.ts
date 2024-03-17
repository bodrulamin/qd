import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamPaperComponent} from "./components/exam-paper.component";
import {RouterModule} from "@angular/router";
import {BadgeModule} from "primeng/badge";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {AngularSplitModule} from "angular-split";
import {ScientificCalculatorComponent} from './components/scientific-calculator/scientific-calculator.component';
import {DialogModule} from "primeng/dialog";
import {ToggleButtonModule} from "primeng/togglebutton";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {EditorModule} from '@tinymce/tinymce-angular';
import {SpreadSheetsModule} from "@grapecity/spread-sheets-angular";


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
    TableModule,
    AngularSplitModule,
    DialogModule,
    ToggleButtonModule,
    CKEditorModule,
    EditorModule,
    SpreadSheetsModule
  ]
})
export class ExamPaperModule {
}
