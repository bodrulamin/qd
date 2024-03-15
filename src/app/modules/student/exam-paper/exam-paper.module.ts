import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamPaperComponent} from "./components/exam-paper.component";
import {RouterModule} from "@angular/router";
import {SplitterModule} from "primeng/splitter";
import {BadgeModule} from "primeng/badge";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    ExamPaperComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: ExamPaperComponent}
        ]),
        FormsModule,
        SplitterModule,
        BadgeModule,
        PdfViewerModule,
        EditorModule,
        ButtonModule,
        TableModule,

    ]
})
export class ExamPaperModule {
}
