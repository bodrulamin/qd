import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {uploadEnrollmentRoutes} from "./upload.enrollment.routes";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {UploadEnrollmentComponent} from "./components/upload.enrollment.component";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";

@NgModule({
  imports: [
    RouterModule.forChild(uploadEnrollmentRoutes),
    FormsModule,
    CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
  ],
  declarations: [
    UploadEnrollmentComponent,
  ]
})
export class UploadEnrollmentModule {
}
