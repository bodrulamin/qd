import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {StudentHomeComponent} from "./components/student-home.component";
import {HomeComponent} from "../../admin/home/components/home.component";

@NgModule({
  declarations: [
    StudentHomeComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '', component: HomeComponent
    }]),
    ButtonModule,
  ],
  providers: [],
  bootstrap: []
})
export class StudentHomeModule {

}
