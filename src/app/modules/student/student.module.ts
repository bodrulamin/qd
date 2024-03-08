import {NgModule} from '@angular/core';
import {StudentLoginComponent} from "./login/student-login.component";
import {RouterModule} from "@angular/router";
import {sudentRoutes} from "./student.routes";
import {FormsModule} from "@angular/forms";
import {AuthModule} from "../auth/auth.module";
import { StudentHomeComponent } from './home/student-home.component';
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    StudentLoginComponent,
    StudentHomeComponent,

  ],
  imports: [
    RouterModule.forChild(sudentRoutes),
    FormsModule,
    AuthModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: []
})
export class StudentModule {

}
