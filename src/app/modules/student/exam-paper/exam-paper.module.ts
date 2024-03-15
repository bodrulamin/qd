import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamPaperComponent} from "./components/exam-paper.component";
import {RouterModule} from "@angular/router";
import {SplitterModule} from "primeng/splitter";
import {BadgeModule} from "primeng/badge";
import {PdfViewerModule} from "ng2-pdf-viewer";


@NgModule({
  declarations: [
    ExamPaperComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: ExamPaperComponent}
        ]),
        SplitterModule,
        BadgeModule,
        PdfViewerModule,

    ]
})
export class ExamPaperModule {
}
