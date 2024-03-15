import {NgModule} from '@angular/core';
import {StudentLoginComponent} from "./login/student-login.component";
import {RouterModule} from "@angular/router";
import {sudentRoutes} from "./student.routes";
import {FormsModule} from "@angular/forms";
import {AuthModule} from "../auth/auth.module";
import {ButtonModule} from "primeng/button";
import {InstructionComponent} from "./instruction/components/instruction.component";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    StudentLoginComponent,
    InstructionComponent
  ],
  imports: [
    RouterModule.forChild(sudentRoutes),
    FormsModule,
    AuthModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,

  ],
  providers: [],
  bootstrap: []
})
export class StudentModule {

}
