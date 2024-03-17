import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamPaperComponent} from "./components/exam-paper.component";
import {RouterModule} from "@angular/router";
import {BadgeModule} from "primeng/badge";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {SpreadSheetsModule} from "@grapecity/spread-sheets-angular";
import {AngularSplitModule} from "angular-split";
import { ScientificCalculatorComponent } from './components/scientific-calculator/scientific-calculator.component';
import {DialogModule} from "primeng/dialog";
import {ToggleButtonModule} from "primeng/togglebutton";


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
    EditorModule,
    ButtonModule,
    TableModule,
    SpreadSheetsModule,
    AngularSplitModule,
    DialogModule,
    ToggleButtonModule

  ]
})
export class ExamPaperModule {
}
