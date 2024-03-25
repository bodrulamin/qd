import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {uploadStudentRoutes} from "./upload.student.routes";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {UploadStudentComponent} from "./components/upload.student.component";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";

@NgModule({
  imports: [
    RouterModule.forChild(uploadStudentRoutes),
    FormsModule,
    CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
  ],
  declarations: [
    UploadStudentComponent,
  ]
})
export class UploadStudentModule {
}
